import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { Eye, EyeOff, RotateCcw, Scissors } from 'lucide-react';
import { structures, type StructureId } from '@/components/three/structures';
import { ToothFallback } from '@/components/three/ToothFallback';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { hasWebGL, isLowPower, prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';

const ToothCanvas = lazy(() => import('@/components/three/ToothCanvas'));

const ALL_VISIBLE: Record<StructureId, boolean> = { enamel: true, dentin: true, pulp: true, root: true, support: true };

export function SmileExplorer() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<StructureId | null>(null);
  const [visible, setVisible] = useState(ALL_VISIBLE);
  const [cutaway, setCutaway] = useState(true);
  const [mode, setMode] = useState<'pending' | '3d' | 'fallback'>('pending');
  const [canUpgrade, setCanUpgrade] = useState(false);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const scrollProgress = useRef(0);
  const drag = useRef({ x: 0, y: 0 });
  const reduce = prefersReducedMotion();

  useEffect(() => {
    const gl = hasWebGL();
    const force = new URLSearchParams(window.location.search).has('force3d');
    const ok = gl && (force || !isLowPower());
    setMode(ok ? '3d' : 'fallback');
    setCanUpgrade(gl && !ok);
  }, []);

  // monta o canvas só perto da viewport e pausa fora dela
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ioNear = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' });
    const ioView = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px 0px' });
    ioNear.observe(el);
    ioView.observe(el);
    return () => {
      ioNear.disconnect();
      ioView.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => (scrollProgress.current = self.progress),
      });
      if (!reduce) {
        gsap.from('[data-ex-panel] > *', {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-ex-panel]', start: 'top 80%', once: true },
        });
        gsap.fromTo(
          '[data-ex-ring]',
          { scale: 0.6, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: true } },
        );
      }
      return () => st.kill();
    },
    { scope: root },
  );

  // texto informativo com máscara
  useEffect(() => {
    if (reduce) return;
    gsap.fromTo('[data-ex-info] [data-line]', { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' });
  }, [selected, reduce]);

  const onPointerDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (mode !== '3d') return;
    const startX = e.clientX;
    const startY = e.clientY;
    const base = { ...drag.current };
    const move = (ev: PointerEvent) => {
      drag.current.x = base.x + (ev.clientX - startX) * 0.01;
      drag.current.y = Math.max(-0.5, Math.min(0.5, base.y + (ev.clientY - startY) * 0.004));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const current = structures.find((s) => s.id === selected);
  const toggleLayer = (id: StructureId) => setVisible((v) => ({ ...v, [id]: !v[id] }));
  const select = (id: StructureId) => {
    setSelected((s) => (s === id ? null : id));
    setVisible((v) => ({ ...v, [id]: true }));
  };

  return (
    <section ref={root} id="explorador" aria-labelledby="ex-title" className="relative overflow-hidden bg-mist py-24 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-ex-ring className="absolute right-[-10%] top-1/2 h-[70vmax] w-[70vmax] -translate-y-1/2 rounded-full border border-sage/50" />
        <div className="absolute right-[2%] top-1/2 h-[46vmax] w-[46vmax] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_65%)]" />
      </div>

      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div data-ex-panel className="lg:col-span-5">
          <Eyebrow index="03">Explorador 3D do sorriso</Eyebrow>
          <RevealText as="h2" id="ex-title" className="mt-6 text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
            Conhecer também é <em className="serif-accent normal-case text-petrol">cuidar.</em>
          </RevealText>
          <p className="mt-6 max-w-md text-fluid-base leading-relaxed text-petrol/80">
            Explore as estruturas de um dente. Selecione uma camada para destacá-la e aproximar a visualização.
          </p>

          <div role="group" aria-label="Estruturas do dente" className="mt-8 flex flex-wrap gap-2">
            {structures.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={selected === s.id}
                onClick={() => select(s.id)}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 font-display text-[14px] font-medium transition-all duration-300',
                  selected === s.id ? 'border-petrol bg-petrol text-ivory' : 'border-petrol/15 bg-white/70 text-petrol hover:border-petrol/50',
                )}
              >
                <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10" style={{ background: s.color }} aria-hidden="true" />
                {s.label}
              </button>
            ))}
          </div>

          <div data-ex-info className="mt-8 min-h-[170px] rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-float backdrop-blur" aria-live="polite">
            <h3 className="overflow-hidden font-display text-fluid-lg font-medium text-deep">
              <span data-line className="block">
                {current ? current.label : 'Visão geral'}
              </span>
            </h3>
            <p className="mt-3 overflow-hidden text-[15px] leading-relaxed text-petrol/80">
              <span data-line className="block">
                {current
                  ? current.text
                  : 'O dente é formado por camadas com funções diferentes. Acima da gengiva fica a coroa; abaixo, a raiz, sustentada pelo osso alveolar.'}
              </span>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setSelected(null)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold text-petrol hover:bg-white/70" disabled={!selected}>
              <RotateCcw size={16} aria-hidden="true" /> Voltar à visão geral
            </button>
            {mode === '3d' && (
              <button
                type="button"
                aria-pressed={cutaway}
                onClick={() => setCutaway((c) => !c)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold text-petrol hover:bg-white/70"
              >
                <Scissors size={16} aria-hidden="true" /> {cutaway ? 'Ver dente inteiro' : 'Ver em corte'}
              </button>
            )}
          </div>

          {mode === '3d' && (
            <fieldset className="mt-4">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sage-ink">Camadas</legend>
              <div className="flex flex-wrap gap-1.5">
                {structures.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={visible[s.id]}
                    onClick={() => toggleLayer(s.id)}
                    className={cn(
                      'inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors',
                      visible[s.id] ? 'bg-white text-petrol' : 'bg-transparent text-petrol/45 line-through',
                    )}
                  >
                    {visible[s.id] ? <Eye size={14} aria-hidden="true" /> : <EyeOff size={14} aria-hidden="true" />}
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <div className="relative lg:col-span-7">
          <div
            ref={stage}
            onPointerDown={onPointerDown}
            className={cn('relative mx-auto aspect-square w-full max-w-[680px]', mode === '3d' && 'cursor-grab active:cursor-grabbing')}
          >
            {mode === '3d' && near ? (
              <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-sm text-petrol/60">Carregando modelo 3D…</div>}>
                <ToothCanvas
                  active={inView}
                  selected={selected}
                  visible={visible}
                  cutaway={cutaway}
                  scrollProgress={scrollProgress}
                  drag={drag}
                  reduceMotion={reduce}
                  onSelect={select}
                  onFail={() => setMode('fallback')}
                />
              </Suspense>
            ) : mode === 'fallback' ? (
              <div className="absolute inset-[6%]">
                <ToothFallback selected={selected} onSelect={select} />
                {canUpgrade && (
                  <button
                    type="button"
                    onClick={() => {
                      setCanUpgrade(false);
                      setMode('3d');
                    }}
                    className="absolute bottom-0 right-0 inline-flex min-h-[44px] items-center rounded-full bg-white/85 px-4 text-sm font-semibold text-petrol shadow-float backdrop-blur"
                  >
                    Ver modelo 3D
                  </button>
                )}
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-petrol/60">
            {mode === '3d' ? 'Arraste para girar · ' : ''}Modelo educativo simplificado, com estruturas de suporte representadas de forma esquemática. Não é ferramenta de diagnóstico.
          </p>
        </div>
      </div>
    </section>
  );
}
