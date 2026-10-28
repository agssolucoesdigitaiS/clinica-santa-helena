import { useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { OVERVIEW, structures, type StructureId } from './structures';

/* ------------------------------------------------------------------
 * Geometria procedural (torno/lathe) de um pré-molar simplificado.
 * Proporções plausíveis para fins educativos — não é ferramenta diagnóstica.
 * ------------------------------------------------------------------ */

type Pt = [number, number]; // [raio, y]

const OUTER_ROOT: Pt[] = [
  [0.0, -2.75],
  [0.07, -2.7],
  [0.16, -2.45],
  [0.24, -1.9],
  [0.32, -1.2],
  [0.39, -0.55],
  [0.43, -0.1],
  [0.44, 0.0],
];
const OUTER_CROWN: Pt[] = [
  [0.44, 0.0],
  [0.55, 0.22],
  [0.66, 0.55],
  [0.69, 0.85],
  [0.64, 1.15],
  [0.52, 1.38],
  [0.32, 1.52],
  [0.12, 1.5],
  [0.0, 1.46],
];

function offset(points: Pt[], d: number, yShift = 0): Pt[] {
  return points.map(([r, y]) => [Math.max(0, r - d), y + yShift]);
}

function lathe(points: Pt[], segments = 72) {
  const g = new THREE.LatheGeometry(
    points.map(([r, y]) => new THREE.Vector2(r, y)),
    segments,
  );
  // achatamento vestíbulo-lingual + cúspides na face oclusal
  const pos = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    v.z *= 0.86;
    if (v.y > 1.15) v.y += 0.07 * Math.cos(2 * theta) * ((v.y - 1.15) / 0.4);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/** Casca: perfil externo seguido do interno invertido. */
function shell(outer: Pt[], thickness: number) {
  const inner = offset(outer, thickness).reverse();
  return lathe([...outer, ...inner]);
}

function useGeometries() {
  return useMemo(() => {
    const enamel = shell(OUTER_CROWN, 0.11);
    const cementum = shell(OUTER_ROOT, 0.035);
    const dentinPts: Pt[] = [...offset(OUTER_ROOT, 0.05).slice(0, -1), ...offset(OUTER_CROWN, 0.135)];
    const dentin = lathe(dentinPts);
    const pulp = lathe([
      [0.0, -2.62],
      [0.025, -2.55],
      [0.05, -1.8],
      [0.08, -0.6],
      [0.16, 0.1],
      [0.24, 0.45],
      [0.25, 0.75],
      [0.17, 0.95],
      [0.0, 0.92],
    ]);
    const gum = lathe([
      [0.46, 0.08],
      [0.62, 0.0],
      [0.98, -0.32],
      [1.15, -0.55],
      [0.44, -0.55],
      [0.45, 0.06],
    ]);
    const ligament = shell(offset(OUTER_ROOT, -0.06).slice(0, -2), 0.02);
    const bone = new THREE.BoxGeometry(2.6, 2.3, 1.8, 1, 1, 1);
    bone.translate(0, -1.72, 0);
    return { enamel, cementum, dentin, pulp, gum, ligament, bone };
  }, []);
}

interface SceneProps {
  selected: StructureId | null;
  visible: Record<StructureId, boolean>;
  cutaway: boolean;
  scrollProgress: MutableRefObject<number>;
  drag: MutableRefObject<{ x: number; y: number }>;
  reduceMotion: boolean;
  onSelect: (id: StructureId) => void;
}

function Tooth({ selected, visible, cutaway, scrollProgress, drag, reduceMotion, onSelect }: SceneProps) {
  const geo = useGeometries();
  const group = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();
  gl.localClippingEnabled = true;
  const clip = useMemo(() => [new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)], []);
  const target = useRef(new THREE.Vector3(0, OVERVIEW.targetY, 0));

  const mats = useMemo(() => {
    const m = (color: string, opts: THREE.MeshPhysicalMaterialParameters = {}) =>
      new THREE.MeshPhysicalMaterial({ color, roughness: 0.42, metalness: 0, clearcoat: 0.3, side: THREE.DoubleSide, transparent: true, ...opts });
    return {
      enamel: m('#F6F3EC', { roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.15, sheen: 0.4 }),
      dentin: m('#EBD5B0', { roughness: 0.6 }),
      pulp: m('#D9837A', { roughness: 0.5, emissive: new THREE.Color('#7a2a24'), emissiveIntensity: 0.15 }),
      root: m('#E6D2B4', { roughness: 0.65 }),
      gum: m('#D79C96', { roughness: 0.5, opacity: 0.85 }),
      ligament: m('#A6BDB5', { roughness: 0.5, opacity: 0.55 }),
      bone: m('#EFE6D6', { roughness: 0.9, opacity: 0.28, depthWrite: false }),
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const auto = reduceMotion ? 0 : t * 0.12;
    const targetRotY = scrollProgress.current * Math.PI * 1.6 + drag.current.x + auto;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, drag.current.y, 4, delta);
    if (!reduceMotion) g.position.y = Math.sin(t * 0.8) * 0.04;

    const s = structures.find((x) => x.id === selected);
    const camTarget = new THREE.Vector3(...(s ? s.camera : OVERVIEW.camera));
    const lookY = s ? s.targetY : OVERVIEW.targetY;
    const k = reduceMotion ? 1 : 1 - Math.exp(-2.4 * delta);
    camera.position.lerp(camTarget, k);
    target.current.lerp(new THREE.Vector3(0, lookY, 0), k);
    camera.lookAt(target.current);

    // destaque / atenuação
    const ids: StructureId[] = ['enamel', 'dentin', 'pulp', 'root', 'support'];
    ids.forEach((id) => {
      const list = id === 'support' ? [mats.gum, mats.ligament, mats.bone] : id === 'root' ? [mats.root] : [mats[id]];
      list.forEach((mat) => {
        const base = mat === mats.bone ? 0.28 : mat === mats.ligament ? 0.55 : mat === mats.gum ? 0.85 : 1;
        const dim = selected && selected !== id ? (id === 'enamel' || id === 'support' ? 0.12 : 0.3) : 1;
        mat.opacity = THREE.MathUtils.damp(mat.opacity, base * dim, 6, delta);
        mat.depthWrite = mat.opacity > 0.95;
        const glow = selected === id ? 0.35 : id === 'pulp' ? 0.15 : 0;
        mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, glow, 6, delta);
        if (selected === id && id !== 'pulp') mat.emissive.set('#5E7A71');
        mat.clippingPlanes = cutaway ? clip : [];
      });
    });
  });

  const pick = (id: StructureId) => ({
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect(id);
    },
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      document.body.style.cursor = 'pointer';
    },
    onPointerOut: () => {
      document.body.style.cursor = '';
    },
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {visible.pulp && <mesh geometry={geo.pulp} material={mats.pulp} renderOrder={1} {...pick('pulp')} />}
      {visible.dentin && <mesh geometry={geo.dentin} material={mats.dentin} renderOrder={2} {...pick('dentin')} />}
      {visible.root && <mesh geometry={geo.cementum} material={mats.root} renderOrder={3} {...pick('root')} />}
      {visible.enamel && <mesh geometry={geo.enamel} material={mats.enamel} renderOrder={4} {...pick('enamel')} />}
      {visible.support && (
        <group>
          <mesh geometry={geo.ligament} material={mats.ligament} renderOrder={5} />
          <mesh geometry={geo.gum} material={mats.gum} renderOrder={6} {...pick('support')} />
          <mesh geometry={geo.bone} material={mats.bone} renderOrder={7} />
        </group>
      )}
    </group>
  );
}

export default function ToothCanvas(props: SceneProps & { active: boolean; onFail: () => void }) {
  const { active, onFail, ...rest } = props;
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: OVERVIEW.camera, fov: 34, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.domElement.addEventListener('webglcontextlost', onFail, { once: true });
      }}
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <hemisphereLight args={['#ffffff', '#c9d8d2', 0.9]} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, 1, -3]} intensity={0.6} color="#D8C5B3" />
      <pointLight position={[0, -1, 3]} intensity={0.6} color="#ffffff" />
      <Tooth {...rest} />
      <ContactShadows position={[0, -3, 0]} opacity={0.22} scale={7} blur={2.6} far={4} color="#22302F" />
    </Canvas>
  );
}
