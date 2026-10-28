/* Cenas ilustradas usadas como placeholders temáticos das fotografias. */
import { useId, type ReactNode } from 'react';
import type { SceneKey } from '@/data/images';
import {
  C,
  HAIR,
  SKIN,
  DentalChair,
  ImplantModel,
  Person,
  Plant,
  Reflector,
  Smile,
  TeethRow,
  ToothSection,
  Window,
} from './primitives';

const W = 800;
const H = 600;

function Bg({ from, to, floor = C.sandSoft, floorY = 470, w = W, h = H }: { from: string; to: string; floor?: string; floorY?: number; w?: number; h?: number }) {
  const id = `bg${useId().replace(/:/g, '')}`;
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} />
      {floorY < h && <rect y={floorY} width={w} height={h - floorY} fill={floor} />}
    </>
  );
}

function Light({ cx, cy, r, opacity = 0.55 }: { cx: number; cy: number; r: number; opacity?: number }) {
  const id = `lt${useId().replace(/:/g, '')}`;
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={opacity} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
    </>
  );
}

function Counter({ x, y, w, h = 90, top = C.stone, body = C.white }: { x: number; y: number; w: number; h?: number; top?: string; body?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={body} stroke="#E4E2DC" strokeWidth={2} />
      <rect x={x - 6} y={y - 10} width={w + 12} height={14} rx={5} fill={top} />
      {Array.from({ length: Math.max(1, Math.floor(w / 90)) }).map((_, i, arr) => (
        <line key={i} x1={x + ((i + 1) * w) / (arr.length + 1)} y1={y + 6} x2={x + ((i + 1) * w) / (arr.length + 1)} y2={y + h - 6} stroke="#E4E2DC" strokeWidth={2} />
      ))}
    </g>
  );
}

function Instrument({ x, y, len = 150, rot = 0, tip = 'mirror' }: { x: number; y: number; len?: number; rot?: number; tip?: 'mirror' | 'probe' | 'tweezers' }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={0} y={-4} width={len} height={8} rx={4} fill={C.steel} stroke={C.steelDark} strokeWidth={1} />
      <rect x={len * 0.1} y={-5} width={len * 0.45} height={10} rx={5} fill={C.steelDark} opacity={0.35} />
      {tip === 'mirror' && <circle cx={len + 14} cy={0} r={12} fill="#DDE6E4" stroke={C.steelDark} strokeWidth={2} />}
      {tip === 'probe' && <path d={`M${len},0 L${len + 22},-2 C${len + 30},-2 ${len + 30},8 ${len + 26},10`} stroke={C.steelDark} strokeWidth={3} fill="none" strokeLinecap="round" />}
      {tip === 'tweezers' && <path d={`M${len},-3 L${len + 30},-1 M${len},3 L${len + 30},1`} stroke={C.steelDark} strokeWidth={3} strokeLinecap="round" />}
    </g>
  );
}

function Tray({ x, y, w = 360, h = 150, children }: { x: number; y: number; w?: number; h?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={6} y={10} width={w} height={h} rx={18} fill={C.deep} opacity={0.08} />
      <rect width={w} height={h} rx={18} fill="#F1F3F2" stroke={C.steel} strokeWidth={3} />
      <rect x={14} y={14} width={w - 28} height={h - 28} rx={10} fill={C.sageSoft} opacity={0.55} />
      {children}
    </g>
  );
}

function Monitor({ x, y, w = 240, h = 150 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={w / 2 - 10} y={h} width={20} height={40} fill={C.steelDark} />
      <rect x={w / 2 - 50} y={h + 38} width={100} height={8} rx={4} fill={C.steelDark} />
      <rect width={w} height={h} rx={10} fill={C.deep} />
      <rect x={8} y={8} width={w - 16} height={h - 16} rx={6} fill="#F4F7F6" />
      <rect x={20} y={20} width={w * 0.35} height={10} rx={5} fill={C.petrol} opacity={0.7} />
      <rect x={20} y={40} width={w * 0.5} height={6} rx={3} fill={C.sage} />
      <rect x={20} y={54} width={w * 0.42} height={6} rx={3} fill={C.sage} opacity={0.6} />
      <rect x={20} y={76} width={w * 0.26} height={h - 100} rx={6} fill={C.sandSoft} />
      <rect x={20 + w * 0.3} y={76} width={w * 0.26} height={h - 100} rx={6} fill={C.mist} />
      <rect x={20 + w * 0.6} y={76} width={w * 0.26} height={h - 100} rx={6} fill={C.sageSoft} />
    </g>
  );
}

function Armchair({ x, y, flip, color = C.sage }: { x: number; y: number; flip?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -1 : 1},1)`}>
      <ellipse cx={0} cy={2} rx={90} ry={7} fill={C.deep} opacity={0.08} />
      <rect x={-70} y={-150} width={40} height={130} rx={20} fill={color} />
      <rect x={-70} y={-62} width={140} height={44} rx={18} fill={color} />
      <rect x={-60} y={-18} width={8} height={18} fill={C.woodDark} />
      <rect x={52} y={-18} width={8} height={18} fill={C.woodDark} />
    </g>
  );
}

function ArchModel({ x, y, s = 1, brackets = false, bridge = false }: { x: number; y: number; s?: number; brackets?: boolean; bridge?: boolean }) {
  const teeth = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a = Math.PI * (0.08 + (0.84 * i) / (n - 1));
    const tx = Math.cos(a) * 150;
    const ty = -Math.sin(a) * 170;
    const size = i < 3 || i > n - 4 ? 26 : 19;
    const isBridge = bridge && i >= 3 && i <= 5;
    teeth.push(
      <g key={i} transform={`translate(${tx},${ty}) rotate(${(-a * 180) / Math.PI + 90})`}>
        <rect x={-size / 2} y={-size / 2} width={size} height={size * 0.9} rx={size * 0.35} fill={isBridge ? '#FFFFFF' : C.tooth} stroke={isBridge ? C.sageInk : C.toothShade} strokeWidth={isBridge ? 3 : 2} />
        {brackets && <rect x={-5} y={-3} width={10} height={8} rx={2} fill={C.steel} stroke={C.steelDark} strokeWidth={1} />}
      </g>,
    );
  }
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={20} rx={210} ry={40} fill={C.deep} opacity={0.08} />
      <path d="M-190,10 C-200,-150 -110,-220 0,-222 C110,-220 200,-150 190,10 L120,10 C130,-90 80,-140 0,-142 C-80,-140 -130,-90 -120,10Z" fill={C.gum} />
      <path d="M-200,10 L200,10 L196,40 L-196,40Z" fill="#EDE6DA" />
      {teeth}
      {brackets && <path d="M-142,-26 C-150,-150 -70,-172 0,-172 C70,-172 150,-150 142,-26" stroke={C.steelDark} strokeWidth={2} fill="none" />}
    </g>
  );
}

/* ================================ CENAS ================================ */

type SceneDef = { viewBox?: string; render: () => ReactNode };

const portrait = (skin: string, hair: string, style: 'bun' | 'short' | 'curly' | 'long' | 'ponytail', inner: string, bgA: string, bgB: string) => () => (
  <>
    <Bg from={bgA} to={bgB} floorY={900} w={600} h={800} />
    <Light cx={460} cy={180} r={260} />
    <rect x={60} y={120} width={150} height={260} rx={12} fill="#FBFAF6" opacity={0.65} />
    <rect x={420} y={420} width={140} height={200} rx={70} fill={C.sage} opacity={0.35} />
    <g transform="translate(300,860) scale(2.6)">
      <path d="M-80,-60 C-84,-150 -60,-200 -20,-214 L20,-214 C60,-200 84,-150 80,-60Z" fill={C.white} stroke="#E2E6E4" strokeWidth={1.5} />
      <path d="M-16,-214 L0,-170 L16,-214Z" fill={inner} />
      <path d="M-22,-212 L-34,-150 L-6,-176Z M22,-212 L34,-150 L6,-176Z" fill="#F1F3F2" stroke="#E2E6E4" strokeWidth={1} />
      <rect x={-10} y={-236} width={20} height={26} rx={7} fill={skin} />
      <g transform="translate(0,22)">
        <ellipse cx={0} cy={-272} rx={25} ry={30} fill={skin} />
        <g>
          {style === 'long' ? (
            <path fill={hair} d="M-28,-268 C-32,-314 32,-314 28,-268 L32,-218 C22,-214 18,-236 18,-258 C14,-288 -14,-288 -18,-258 C-18,-236 -22,-214 -32,-218Z" />
          ) : style === 'bun' ? (
            <g fill={hair}>
              <path d="M-27,-270 C-29,-310 29,-310 27,-270 C21,-292 -21,-292 -27,-270Z" />
              <circle cx={0} cy={-308} r={13} />
            </g>
          ) : style === 'curly' ? (
            <g fill={hair}>
              {[-22, -11, 0, 11, 22].map((cx, i) => (
                <circle key={i} cx={cx} cy={-294 - (i % 2) * 6} r={13} />
              ))}
              <circle cx={-27} cy={-274} r={10} />
              <circle cx={27} cy={-274} r={10} />
            </g>
          ) : (
            <path fill={hair} d="M-26,-272 C-27,-304 27,-304 26,-272 C19,-290 -19,-290 -26,-272Z" />
          )}
        </g>
      </g>
      <rect x={30} y={-150} width={22} height={6} rx={3} fill={C.sage} />
    </g>
  </>
);

export const scenes: Record<SceneKey, SceneDef> = {
  reception: {
    render: () => (
      <>
        <Bg from="#FAF8F3" to="#EFEBE3" floorY={455} floor="#E9E1D4" />
        <Light cx={220} cy={160} r={300} opacity={0.8} />
        <Window x={70} y={70} w={210} h={300} />
        {/* painel ripado */}
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x={470 + i * 20} y={40} width={12} height={415} fill={i % 2 ? C.wood : C.woodDark} opacity={0.85} />
          ))}
        </g>
        {/* luminárias pendentes */}
        {[360, 430, 500].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={0} x2={x} y2={150 + i * 12} stroke={C.petrol} strokeWidth={2} />
            <path d={`M${x - 26},${176 + i * 12} C${x - 26},${146 + i * 12} ${x + 26},${146 + i * 12} ${x + 26},${176 + i * 12}Z`} fill={C.sand} />
            <ellipse cx={x} cy={178 + i * 12} rx={18} ry={4} fill="#FFF6E3" />
          </g>
        ))}
        {/* balcão orgânico em pedra */}
        <ellipse cx={410} cy={470} rx={250} ry={16} fill={C.deep} opacity={0.08} />
        <path d="M170,320 C170,296 200,290 240,290 L590,290 C640,290 660,310 660,340 L660,455 L170,455Z" fill={C.stone} />
        <path d="M170,320 C170,296 200,290 240,290 L590,290 C640,290 660,310 660,340 C600,330 260,330 170,320Z" fill="#F6F2EB" />
        <rect x={180} y={430} width={470} height={25} rx={6} fill={C.wood} />
        <path d="M230,360 C330,380 500,380 610,356" stroke="#E2DACD" strokeWidth={3} fill="none" />
        {/* detalhes sálvia */}
        <rect x={680} y={360} width={90} height={95} rx={45} fill={C.sage} />
        <rect x={20} y={380} width={120} height={75} rx={30} fill={C.sage} opacity={0.85} />
        <Plant x={110} y={455} s={0.9} />
        <rect x={250} y={262} width={60} height={30} rx={6} fill={C.white} />
        <circle cx={560} cy={276} r={14} fill={C.sageSoft} />
      </>
    ),
  },
  consultation: {
    render: () => (
      <>
        <Bg from="#F4F6F4" to="#E7ECE9" floorY={480} floor="#E6E0D6" />
        <Window x={540} y={60} w={200} h={260} />
        <Light cx={640} cy={190} r={260} />
        <rect x={40} y={250} width={220} height={150} rx={10} fill={C.white} stroke="#E4E2DC" strokeWidth={2} />
        <rect x={34} y={242} width={232} height={12} rx={5} fill={C.stone} />
        <Reflector x={500} y={0} s={1} />
        <DentalChair x={470} y={480} s={1} />
        {/* paciente sentada na cadeira, voltada para a dentista */}
        <Person x={420} y={392} s={0.9} pose="sit" flip coat={C.sand} inner={C.sandSoft} pants={C.petrol} skin={SKIN[1]} hair={HAIR[0]} hairStyle="long" arm="lap" />
        {/* dentista no mocho */}
        <g>
          <rect x={186} y={420} width={10} height={60} fill={C.steelDark} />
          <ellipse cx={191} cy={480} rx={40} ry={6} fill={C.steelDark} />
          <ellipse cx={191} cy={418} rx={44} ry={12} fill={C.petrol} />
        </g>
        <Person x={190} y={410} s={0.9} pose="sit" coat={C.white} inner={C.sage} pants={C.sageInk} skin={SKIN[0]} hair={HAIR[1]} hairStyle="bun" arm="forward" />
      </>
    ),
  },
  operatory: {
    render: () => (
      <>
        <Bg from="#F6F7F5" to="#E9EDEB" floorY={470} floor="#E3E6E3" />
        {/* armários superiores */}
        <rect x={40} y={70} width={300} height={110} rx={10} fill={C.white} stroke="#E4E2DC" strokeWidth={2} />
        <line x1={190} y1={76} x2={190} y2={174} stroke="#E4E2DC" strokeWidth={2} />
        <Counter x={40} y={300} w={300} h={170} />
        <rect x={70} y={268} width={50} height={22} rx={6} fill={C.sageSoft} />
        <rect x={140} y={264} width={26} height={26} rx={13} fill={C.sand} />
        <rect x={250} y={272} width={60} height={18} rx={4} fill="#F1F3F2" stroke={C.steel} />
        <Light cx={600} cy={120} r={240} />
        <Reflector x={600} y={0} s={1.05} />
        <DentalChair x={560} y={470} s={1.05} />
        {/* unidade auxiliar */}
        <g>
          <rect x={366} y={260} width={10} height={210} fill={C.steelDark} />
          <rect x={330} y={240} width={110} height={22} rx={8} fill={C.steel} />
          <rect x={344} y={230} width={20} height={12} rx={3} fill={C.sage} />
          <rect x={372} y={230} width={20} height={12} rx={3} fill={C.sage} />
          <rect x={400} y={230} width={20} height={12} rx={3} fill={C.sage} />
          <ellipse cx={371} cy={470} rx={40} ry={6} fill={C.steelDark} />
        </g>
        {/* mocho */}
        <g>
          <rect x={461} y={410} width={8} height={60} fill={C.steelDark} />
          <ellipse cx={465} cy={470} rx={32} ry={5} fill={C.steelDark} />
          <ellipse cx={465} cy={408} rx={36} ry={11} fill={C.petrol} />
        </g>
      </>
    ),
  },
  evaluation: {
    render: () => (
      <>
        <Bg from="#F5F4EF" to="#EAE6DE" floorY={480} floor="#E6DFD3" />
        <Light cx={400} cy={150} r={300} />
        <Plant x={720} y={480} s={0.8} />
        <rect x={180} y={340} width={460} height={14} rx={6} fill={C.wood} />
        <rect x={200} y={354} width={12} height={126} fill={C.woodDark} />
        <rect x={608} y={354} width={12} height={126} fill={C.woodDark} />
        <Monitor x={290} y={146} w={240} h={150} />
        <Person x={250} y={420} s={0.82} pose="sit" coat={C.white} inner={C.sage} pants={C.sageInk} skin={SKIN[2]} hair={HAIR[2]} hairStyle="short" arm="raise" />
        <Person x={600} y={420} s={0.82} pose="sit" flip coat={C.sage} inner={C.sageSoft} pants={C.petrol} skin={SKIN[0]} hair={HAIR[3]} hairStyle="ponytail" arm="lap" />
      </>
    ),
  },
  orthodontics: {
    render: () => (
      <>
        <Bg from="#EFD8C6" to="#E2C2AA" floorY={900} />
        <Light cx={300} cy={160} r={320} opacity={0.4} />
        <Smile cx={400} cy={310} w={560} brackets />
      </>
    ),
  },
  whitening: {
    render: () => (
      <>
        <Bg from="#E6CBB6" to="#D7B49B" floorY={900} />
        <Light cx={520} cy={160} r={300} opacity={0.45} />
        <Smile cx={400} cy={310} w={540} />
      </>
    ),
  },
  implant: {
    render: () => (
      <>
        <Bg from="#F2F4F2" to="#E1E7E4" floorY={900} />
        <Light cx={400} cy={220} r={320} opacity={0.7} />
        <ellipse cx={400} cy={520} rx={230} ry={24} fill={C.deep} opacity={0.08} />
        {/* bloco ósseo + gengiva */}
        <path d="M190,300 C190,280 210,270 240,272 L560,272 C590,270 610,280 610,300 L610,500 L190,500Z" fill={C.bone} />
        {Array.from({ length: 40 }).map((_, i) => (
          <circle key={i} cx={210 + ((i * 53) % 380)} cy={320 + ((i * 37) % 170)} r={3 + (i % 3)} fill="#DCCDB2" />
        ))}
        <path d="M190,300 C190,250 230,236 280,246 C330,256 360,262 400,262 C440,262 470,256 520,246 C570,236 610,250 610,300 C560,290 520,300 470,300 L330,300 C280,300 240,290 190,300Z" fill={C.gum} />
        {/* dentes vizinhos (translúcidos) */}
        <g opacity={0.45}>
          <ToothSection x={250} y={150} s={0.62} />
          <ToothSection x={550} y={150} s={0.62} />
        </g>
        <ImplantModel x={400} y={130} s={1.05} />
      </>
    ),
  },
  pediatric: {
    render: () => (
      <>
        <Bg from="#F6F4EE" to="#ECEEE7" floorY={470} floor="#E5DED2" />
        <Light cx={420} cy={150} r={300} />
        <Window x={300} y={60} w={200} h={220} />
        {[90, 150, 210].map((x, i) => (
          <circle key={i} cx={x} cy={110 + i * 30} r={22 - i * 3} fill={[C.sage, C.sand, C.sageSoft][i]} />
        ))}
        <Armchair x={470} y={470} color={C.sageSoft} />
        <Person x={470} y={410} s={0.62} pose="sit" coat="#F2D7B4" inner={C.white} pants={C.sage} skin={SKIN[3]} hair={HAIR[1]} hairStyle="kid" arm="lap" />
        <Person x={600} y={470} s={0.95} flip coat={C.sand} inner={C.white} pants={C.petrol} skin={SKIN[1]} hair={HAIR[0]} hairStyle="long" arm="forward" />
        <g>
          <rect x={226} y={420} width={10} height={50} fill={C.steelDark} />
          <ellipse cx={231} cy={470} rx={36} ry={5} fill={C.steelDark} />
          <ellipse cx={231} cy={418} rx={40} ry={11} fill={C.petrol} />
        </g>
        <Person x={230} y={410} s={0.88} pose="sit" coat={C.white} inner={C.sage} pants={C.sageInk} skin={SKIN[2]} hair={HAIR[2]} hairStyle="curly" arm="forward" />
      </>
    ),
  },
  restorative: {
    render: () => (
      <>
        <Bg from="#F4F5F3" to="#E6EAE8" floorY={360} floor="#EDE8E0" />
        <Light cx={600} cy={120} r={280} />
        <rect x={0} y={350} width={800} height={14} fill={C.stone} />
        <Tray x={120} y={390} w={380} h={170}>
          <Instrument x={40} y={50} len={180} tip="mirror" />
          <Instrument x={40} y={85} len={190} tip="probe" />
          <Instrument x={40} y={120} len={180} tip="tweezers" />
        </Tray>
        {/* potes e seringas de material */}
        {[560, 620, 680].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={470} rx={22} ry={7} fill={C.deep} opacity={0.08} />
            <rect x={x - 20} y={430} width={40} height={38} rx={8} fill={[C.white, C.sageSoft, C.sandSoft][i]} stroke="#DAD8D2" />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${560 + i * 40},${520}) rotate(-12)`}>
            <rect x={0} y={0} width={110} height={16} rx={8} fill={C.white} stroke={C.steel} />
            <rect x={80} y={2} width={30} height={12} rx={6} fill={[C.sage, C.sand, C.petrol][i]} />
          </g>
        ))}
        {/* caixa de luvas */}
        <rect x={560} y={250} width={170} height={100} rx={8} fill={C.white} stroke="#E0DED8" strokeWidth={2} />
        <ellipse cx={645} cy={262} rx={44} ry={8} fill={C.mist} />
        <rect x={580} y={300} width={90} height={10} rx={5} fill={C.sage} />
      </>
    ),
  },
  hygiene: {
    render: () => (
      <>
        <Bg from="#F1F4F3" to="#E4EAE7" floorY={900} />
        <Light cx={240} cy={140} r={300} />
        <Tray x={140} y={170} w={520} h={280}>
          <Instrument x={50} y={60} len={230} tip="mirror" />
          <Instrument x={50} y={110} len={250} tip="probe" />
          <Instrument x={50} y={160} len={240} tip="tweezers" />
          {/* escova */}
          <g transform="translate(60,215)">
            <rect x={0} y={-6} width={260} height={12} rx={6} fill={C.sage} />
            <rect x={260} y={-12} width={60} height={14} rx={4} fill={C.white} stroke={C.steel} />
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x={264 + i * 5.5} y={-24} width={3} height={12} fill="#DCE8F0" />
            ))}
          </g>
          {/* fio dental */}
          <g transform="translate(400,70)">
            <rect x={0} y={0} width={70} height={70} rx={20} fill={C.white} stroke={C.steel} />
            <circle cx={35} cy={35} r={14} fill={C.sageSoft} />
          </g>
          <g transform="translate(410,170)">
            <ellipse cx={25} cy={40} rx={28} ry={6} fill={C.deep} opacity={0.08} />
            <path d="M0,0 L50,0 L44,40 L6,40Z" fill={C.sandSoft} stroke="#DAD0C3" />
          </g>
        </Tray>
      </>
    ),
  },
  endodontic: {
    render: () => (
      <>
        <Bg from="#F4F2EE" to="#E8E3DA" floorY={900} />
        <Light cx={400} cy={200} r={320} opacity={0.6} />
        <rect x={200} y={210} width={400} height={420} rx={40} fill={C.bone} opacity={0.7} />
        <path d="M200,260 C260,220 320,236 400,236 C480,236 540,220 600,260 L600,290 L200,290Z" fill={C.gum} opacity={0.85} />
        <ToothSection x={400} y={90} s={1.15} />
      </>
    ),
  },
  prosthesis: {
    render: () => (
      <>
        <Bg from="#F3F1EC" to="#E6E1D7" floorY={420} floor="#DCD3C5" />
        <Light cx={560} cy={100} r={280} />
        {/* luminária de bancada */}
        <g stroke={C.petrol} strokeWidth={6} strokeLinecap="round" fill="none">
          <path d="M680,420 L680,240 L560,150" />
        </g>
        <path d="M520,150 C520,124 600,124 600,150Z" fill={C.petrol} />
        <rect x={0} y={410} width={800} height={14} fill={C.wood} />
        <ArchModel x={360} y={470} s={1.05} bridge />
        <Instrument x={600} y={520} len={140} rot={-8} tip="probe" />
      </>
    ),
  },
  closing: {
    render: () => (
      <>
        <Bg from="#EEF0EC" to="#DFE5E1" floorY={900} />
        <Light cx={300} cy={200} r={360} opacity={0.6} />
        <circle cx={600} cy={160} r={90} fill={C.sand} opacity={0.35} />
        <g transform="translate(400,700)">
          <path d="M-210,0 C-210,-120 -150,-180 -70,-196 L70,-196 C150,-180 210,-120 210,0Z" fill={C.sage} />
          <rect x={-34} y={-250} width={68} height={70} rx={20} fill={SKIN[1]} />
          <ellipse cx={0} cy={-380} rx={110} ry={140} fill={SKIN[1]} />
          <path d="M-118,-390 C-130,-560 130,-560 118,-390 C110,-470 60,-500 0,-498 C-60,-500 -110,-470 -118,-390Z" fill={HAIR[0]} />
          <path d="M-60,-410 Q-44,-424 -28,-410" stroke={C.deep} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M28,-410 Q44,-424 60,-410" stroke={C.deep} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M-56,-322 C-30,-284 30,-284 56,-322 C30,-308 -30,-308 -56,-322Z" fill={C.tooth} stroke={C.lip} strokeWidth={5} strokeLinejoin="round" />
          <ellipse cx={-70} cy={-345} rx={18} ry={10} fill={C.lip} opacity={0.25} />
          <ellipse cx={70} cy={-345} rx={18} ry={10} fill={C.lip} opacity={0.25} />
        </g>
      </>
    ),
  },
  portraitA: { viewBox: '0 0 600 800', render: portrait(SKIN[0], HAIR[1], 'bun', C.sage, '#F2F4F2', '#E2E8E5') },
  portraitB: { viewBox: '0 0 600 800', render: portrait(SKIN[2], HAIR[2], 'short', C.petrol, '#F3F1EC', '#E5E0D6') },
  portraitC: { viewBox: '0 0 600 800', render: portrait(SKIN[1], HAIR[0], 'curly', C.sand, '#F1F2EE', '#E3E7E2') },
  gumHealth: {
    render: () => (
      <>
        <Bg from="#F1E4DA" to="#E8D3C4" floorY={900} />
        <Light cx={400} cy={200} r={320} opacity={0.5} />
        <rect x={90} y={140} width={620} height={150} rx={60} fill={C.gum} />
        <path d="M90,250 Q130,330 168,250 Q206,330 244,250 Q282,330 320,250 Q358,330 400,250 Q442,330 480,250 Q518,330 556,250 Q594,330 632,250 Q670,330 710,250 L710,300 L90,300Z" fill={C.gum} />
        <TeethRow x={110} y={250} w={580} h={220} n={8} />
        <path d="M110,250 Q148,320 186,250" stroke={C.gumDark} strokeWidth={2} fill="none" opacity={0.4} />
      </>
    ),
  },
  routine: {
    render: () => (
      <>
        <Bg from="#F4F6F5" to="#E6ECE9" floorY={420} floor={C.stone} />
        <rect x={160} y={60} width={480} height={300} rx={150} fill="#F8FBFA" stroke={C.steel} strokeWidth={4} />
        <Light cx={400} cy={200} r={220} opacity={0.8} />
        <rect x={0} y={410} width={800} height={10} fill="#E3DCD0" />
        {/* copo com escovas */}
        <g transform="translate(300,420)">
          <ellipse cx={0} cy={4} rx={50} ry={8} fill={C.deep} opacity={0.08} />
          <path d="M-40,-110 L40,-110 L34,0 L-34,0Z" fill="#E9F0EE" stroke={C.steel} strokeWidth={2} opacity={0.95} />
          <g transform="rotate(-10)">
            <rect x={-24} y={-230} width={10} height={150} rx={5} fill={C.sage} />
            <rect x={-28} y={-260} width={18} height={34} rx={5} fill={C.white} stroke={C.steel} />
          </g>
          <g transform="rotate(8)">
            <rect x={12} y={-240} width={10} height={160} rx={5} fill={C.sand} />
            <rect x={8} y={-270} width={18} height={34} rx={5} fill={C.white} stroke={C.steel} />
          </g>
        </g>
        {/* fio dental */}
        <g transform="translate(470,350)">
          <ellipse cx={40} cy={74} rx={50} ry={8} fill={C.deep} opacity={0.08} />
          <rect x={0} y={0} width={80} height={72} rx={22} fill={C.white} stroke={C.steel} />
          <circle cx={40} cy={36} r={16} fill={C.sageSoft} />
        </g>
        <g transform="translate(590,380)">
          <rect x={0} y={0} width={36} height={40} rx={10} fill={C.petrol} />
          <rect x={6} y={-14} width={24} height={16} rx={4} fill={C.sage} />
        </g>
      </>
    ),
  },
  shadeGuide: {
    render: () => (
      <>
        <Bg from="#F3F1EC" to="#E6E3DC" floorY={900} />
        <Light cx={400} cy={220} r={320} opacity={0.6} />
        <rect x={150} y={400} width={500} height={30} rx={14} fill={C.petrol} />
        {Array.from({ length: 9 }).map((_, i) => {
          const shades = ['#F6F1E6', '#F2EBDC', '#EFE6D3', '#ECE1CB', '#E8DBC2', '#E4D5B9', '#E0CFB0', '#DCC9A8', '#D7C2A0'];
          const a = -40 + i * 10;
          return (
            <g key={i} transform={`translate(400,415) rotate(${a})`}>
              <rect x={-6} y={-110} width={12} height={110} fill={C.steel} />
              <path d="M-26,-190 C-30,-232 -14,-240 0,-236 C14,-240 30,-232 26,-190 C24,-160 14,-140 0,-136 C-14,-140 -24,-160 -26,-190Z" fill={shades[i]} stroke="#D8CFBE" strokeWidth={2} />
            </g>
          );
        })}
      </>
    ),
  },
  archModel: {
    render: () => (
      <>
        <Bg from="#F0F3F1" to="#E1E7E4" floorY={900} />
        <Light cx={400} cy={240} r={320} opacity={0.6} />
        <ArchModel x={400} y={460} s={1.25} brackets />
      </>
    ),
  },
  kidsBrush: {
    render: () => (
      <>
        <Bg from="#F6F3EC" to="#ECE8DD" floorY={900} />
        <Light cx={300} cy={200} r={300} opacity={0.7} />
        <circle cx={620} cy={140} r={60} fill={C.sage} opacity={0.4} />
        <circle cx={150} cy={460} r={40} fill={C.sand} opacity={0.5} />
        <g transform="translate(160,360) rotate(-18)">
          <ellipse cx={230} cy={40} rx={240} ry={10} fill={C.deep} opacity={0.06} />
          <rect x={0} y={-16} width={300} height={32} rx={16} fill={C.sage} />
          <rect x={300} y={-14} width={90} height={22} rx={8} fill={C.white} stroke={C.steel} />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={304 + i * 7} y={-38} width={4} height={24} rx={2} fill={i % 3 ? '#E7EEF3' : C.sandSoft} />
          ))}
          <circle cx={60} cy={0} r={8} fill={C.white} opacity={0.6} />
        </g>
        {/* ampulheta */}
        <g transform="translate(560,330)">
          <rect x={-50} y={-130} width={100} height={14} rx={6} fill={C.wood} />
          <rect x={-50} y={116} width={100} height={14} rx={6} fill={C.wood} />
          <path d="M-36,-116 L36,-116 C36,-50 6,-20 6,0 C6,20 36,50 36,116 L-36,116 C-36,50 -6,20 -6,0 C-6,-20 -36,-50 -36,-116Z" fill="#F1F6F4" stroke={C.steel} strokeWidth={2} />
          <path d="M-22,-70 L22,-70 C18,-40 4,-20 0,-6 C-4,-20 -18,-40 -22,-70Z" fill={C.sand} />
          <path d="M-30,116 C-28,80 -10,70 0,64 C10,70 28,80 30,116Z" fill={C.sand} />
        </g>
      </>
    ),
  },
  implantVsProsthesis: {
    render: () => (
      <>
        <Bg from="#F2F3F0" to="#E4E8E4" floorY={900} />
        <line x1={400} y1={60} x2={400} y2={540} stroke={C.steel} strokeWidth={2} strokeDasharray="6 8" />
        {/* esquerda: ponte fixa */}
        <g transform="translate(200,0)">
          <rect x={-170} y={300} width={340} height={200} rx={30} fill={C.bone} />
          <path d="M-170,320 C-120,290 120,290 170,320 L170,340 L-170,340Z" fill={C.gum} />
          <g transform="translate(-110,170) scale(0.5)">
            <ToothSection x={0} y={0} s={1} />
          </g>
          <g transform="translate(110,170) scale(0.5)">
            <ToothSection x={0} y={0} s={1} />
          </g>
          <path d="M-150,186 C-150,160 150,160 150,186 L150,226 C150,250 -150,250 -150,226Z" fill={C.white} stroke={C.sageInk} strokeWidth={3} opacity={0.92} />
        </g>
        {/* direita: implante */}
        <g transform="translate(600,0)">
          <rect x={-170} y={300} width={340} height={200} rx={30} fill={C.bone} />
          <path d="M-170,320 C-120,290 120,290 170,320 L170,340 L-170,340Z" fill={C.gum} />
          <ImplantModel x={0} y={170} s={0.8} />
        </g>
      </>
    ),
  },
  firstVisit: {
    render: () => (
      <>
        <Bg from="#F7F5EF" to="#ECE7DE" floorY={470} floor="#E6DED1" />
        <Light cx={400} cy={160} r={300} opacity={0.7} />
        <Plant x={400} y={470} s={0.75} />
        <Armchair x={210} y={470} color={C.sage} />
        <Armchair x={590} y={470} flip color={C.sand} />
        <Person x={210} y={410} s={0.86} pose="sit" coat={C.white} inner={C.sage} pants={C.sageInk} skin={SKIN[0]} hair={HAIR[3]} hairStyle="ponytail" arm="forward" />
        <Person x={590} y={410} s={0.86} pose="sit" flip coat={C.petrol} inner={C.sageSoft} pants={C.deep} skin={SKIN[2]} hair={HAIR[2]} hairStyle="short" arm="lap" />
      </>
    ),
  },
  planning: {
    render: () => (
      <>
        <Bg from="#F4F5F2" to="#E7EAE6" floorY={480} floor="#E4DFD6" />
        <Light cx={420} cy={140} r={280} />
        <rect x={180} y={360} width={440} height={14} rx={6} fill={C.stone} />
        <rect x={200} y={374} width={12} height={106} fill={C.steelDark} />
        <rect x={588} y={374} width={12} height={106} fill={C.steelDark} />
        <ArchModel x={400} y={346} s={0.35} />
        <rect x={470} y={330} width={90} height={30} rx={6} fill={C.deep} />
        <rect x={476} y={334} width={78} height={22} rx={4} fill={C.sageSoft} />
        <Person x={180} y={470} s={0.95} coat={C.white} inner={C.petrol} pants={C.sageInk} skin={SKIN[1]} hair={HAIR[0]} hairStyle="short" arm="forward" />
        <Person x={640} y={420} s={0.82} pose="sit" flip coat={C.sand} inner={C.white} pants={C.petrol} skin={SKIN[3]} hair={HAIR[1]} hairStyle="long" arm="lap" />
      </>
    ),
  },
  followUp: {
    render: () => (
      <>
        <Bg from="#F5F3EE" to="#E9E5DC" floorY={900} />
        <Light cx={300} cy={160} r={300} opacity={0.7} />
        {/* calendário */}
        <g transform="translate(150,120)">
          <rect x={8} y={12} width={320} height={300} rx={18} fill={C.deep} opacity={0.07} />
          <rect width={320} height={300} rx={18} fill={C.white} />
          <rect width={320} height={56} rx={18} fill={C.petrol} />
          <rect y={38} width={320} height={18} fill={C.petrol} />
          {Array.from({ length: 28 }).map((_, i) => {
            const cx = 30 + (i % 7) * 43;
            const cy = 90 + Math.floor(i / 7) * 52;
            const mark = i === 9 || i === 23;
            return (
              <g key={i}>
                <rect x={cx - 10} y={cy - 6} width={20} height={12} rx={4} fill={C.mist} />
                {mark && <circle cx={cx} cy={cy} r={18} fill="none" stroke={C.sage} strokeWidth={4} />}
              </g>
            );
          })}
        </g>
        {/* kit */}
        <g transform="translate(520,380)">
          <rect x={0} y={0} width={200} height={110} rx={24} fill={C.sage} />
          <rect x={18} y={-30} width={10} height={90} rx={5} fill={C.white} transform="rotate(-8)" />
          <rect x={44} y={-40} width={10} height={100} rx={5} fill={C.sand} transform="rotate(4)" />
          <rect x={120} y={-20} width={50} height={50} rx={14} fill={C.white} />
        </g>
      </>
    ),
  },
  welcomeConsult: {
    render: () => (
      <>
        <Bg from="#F6F4EF" to="#EBE7DF" floorY={470} floor="#E4DCCF" />
        <Light cx={560} cy={150} r={280} opacity={0.7} />
        <Window x={460} y={50} w={240} h={250} />
        <Armchair x={250} y={470} color={C.sand} />
        <Person x={250} y={410} s={0.88} pose="sit" coat={C.sageSoft} inner={C.white} pants={C.petrol} skin={SKIN[3]} hair={HAIR[3]} hairStyle="long" arm="lap" />
        <Person x={520} y={470} s={1} flip coat={C.white} inner={C.sage} pants={C.sageInk} skin={SKIN[1]} hair={HAIR[0]} hairStyle="bun" arm="raise" />
        <Plant x={700} y={470} s={0.8} />
      </>
    ),
  },
};

export function Scene({ scene, className }: { scene: SceneKey; className?: string }) {
  const def = scenes[scene];
  return (
    <svg viewBox={def.viewBox ?? `0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      {def.render()}
    </svg>
  );
}
