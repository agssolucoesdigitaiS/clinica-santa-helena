import { useRef } from 'react';
import { ArrowDownRight, HeartHandshake, MessagesSquare, ShieldCheck } from 'lucide-react';
import { DentalImage } from '@/components/ui/DentalImage';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { useSectionNav } from '@/components/layout/Header';
import { gsap, MQ, SplitText, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { useIntroReady } from '@/lib/intro';

const chips = [
  { icon: HeartHandshake, label: 'Atendimento individualizado', pos: 'lg:left-[46%] lg:top-[24%]' },
  { icon: ShieldCheck, label: 'Prevenção e saúde bucal', pos: 'lg:left-[40%] lg:top-[56%]' },
  { icon: MessagesSquare, label: 'Orientação em cada etapa', pos: 'lg:left-[60%] lg:top-[80%]' },
];

/* Moldura da imagem no desktop: começa como janela orgânica à direita e se expande até ocupar a tela. */
const FRAME_START = 'inset(15% 3.5% 11% 52% round 46% 54% 40% 60% / 54% 42% 58% 46%)';
const FRAME_END = 'inset(0% 0% 0% 0% round 0% 0% 0% 0% / 0% 0% 0% 0%)';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const go = useSectionNav();

  // Entrada (após o preloader)
  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready) return;
      gsap.set('[data-hero-content]', { autoAlpha: 1 });
      if (prefersReducedMotion()) {
        gsap.set('[data-hero-curve]', { strokeDashoffset: 0 });
        return;
      }
      let split: SplitText | null = null;
      let cancelled = false;
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (cancelled) return;
        split = SplitText.create('[data-hero-title]', { type: 'lines', mask: 'lines', linesClass: 'split-line' });
        tl.from('[data-hero-bg]', { autoAlpha: 0, scale: 1.04, duration: 1.4, ease: 'power2.out' })
          .from(split.lines, { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.1)
          .fromTo('[data-hero-reveal]', { clipPath: 'circle(0% at 75% 52%)' }, { clipPath: 'circle(85% at 75% 52%)', duration: 1.8, ease: 'expo.inOut' }, 0.15)
          .from('[data-hero-photo]', { scale: 1.25, duration: 2.2 }, 0.15)
          .from('[data-hero-sub]', { y: 24, autoAlpha: 0, duration: 1 }, 0.7)
          .from('[data-hero-cta] > *', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.8)
          .from('[data-hero-chip]', { y: 40, scale: 0.8, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: 'back.out(1.6)' }, 1.0)
          .fromTo('[data-hero-curve]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }, 0.9)
          .from('[data-hero-scroll]', { autoAlpha: 0, y: 16, duration: 0.8 }, 1.6);
      });
      return () => {
        cancelled = true;
        tl.kill();
        split?.revert();
      };
    },
    { scope: root, dependencies: [ready] },
  );

  // Scroll: a fotografia se expande progressivamente (reversível)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.set('[data-hero-frame]', { clipPath: FRAME_START });
        gsap.set('[data-hero-photo-wrap]', { xPercent: 23 });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=130%', scrub: 0.6, pin: true, anticipatePin: 1 },
        });
        tl.to('[data-hero-frame]', { clipPath: FRAME_END, duration: 1, ease: 'power2.inOut' }, 0)
          .to('[data-hero-photo-wrap]', { xPercent: 0, duration: 1, ease: 'power2.inOut' }, 0)
          .to('[data-hero-text]', { yPercent: -18, autoAlpha: 0, duration: 0.5 }, 0)
          .to('[data-hero-chip]', { y: (i) => -80 - i * 40, autoAlpha: 0, duration: 0.45, stagger: 0.04 }, 0)
          .to('[data-hero-curve-svg]', { autoAlpha: 0, duration: 0.3 }, 0)
          .to('[data-hero-scroll]', { autoAlpha: 0, duration: 0.2 }, 0)
          .fromTo('[data-hero-caption]', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.72)
          .to({}, { duration: 0.25 });
      });
      mm.add(MQ.mobile, () => {
        gsap.to('[data-hero-photo]', {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: '[data-hero-mobile-frame]', start: 'top 80%', end: 'bottom top', scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory lg:h-[100svh] lg:min-h-[720px]">
      {/* fundo orgânico */}
      <div data-hero-bg aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] top-[8%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(166,189,181,0.28),transparent_62%)]" />
        <div className="absolute -bottom-[30%] left-[30%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(216,197,179,0.32),transparent_60%)]" />
      </div>

      {/* Desktop: moldura que se expande */}
      <div data-hero-frame className="absolute inset-0 z-[1] hidden overflow-hidden lg:block" style={{ clipPath: FRAME_START }}>
        <div data-hero-reveal className="absolute inset-0">
          <div data-hero-photo-wrap className="absolute inset-0">
            <div data-hero-photo className="absolute inset-0">
              <DentalImage id="hero" priority sizes="100vw" tagPosition="br" />
            </div>
          </div>
          <div data-hero-caption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/60 to-transparent px-12 pb-12 pt-40 opacity-0">
            <p className="font-serif text-4xl text-ivory">Um lugar para ser ouvido.</p>
            <p className="mt-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-ivory/75">Clínica Santa Helena · São Paulo</p>
          </div>
        </div>
      </div>

      {/* Linha curva desenhada */}
      <svg data-hero-curve-svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] hidden h-full w-full lg:block" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path
          data-hero-curve
          pathLength={1}
          d="M-20 870 C 240 820, 420 900, 620 800 S 830 560, 760 400 S 700 130, 980 110"
          fill="none"
          stroke="#A6BDB5"
          strokeWidth={1.5}
          strokeDasharray="1"
          strokeDashoffset={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div data-hero-content className="container-x relative z-[3] flex flex-col pt-32 lg:h-full lg:justify-center lg:pt-16" style={{ visibility: 'hidden' }}>
        <div data-hero-text className="max-w-[44rem] lg:max-w-[46%]">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-petrol/10 bg-white/60 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-sage-ink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" /> Clínica Odontológica · São Paulo
          </p>
          <h1 id="hero-title" data-hero-title className="font-display text-fluid-4xl font-medium uppercase leading-[0.92] text-deep">
            Seu <em className="serif-accent normal-case text-petrol">sorriso</em>
            <br />
            merece
            <br />
            atenção especial.
          </h1>
          <p data-hero-sub className="mt-7 max-w-md font-body text-fluid-base leading-relaxed text-petrol/80">
            Cuidado odontológico com atenção às suas necessidades, do atendimento preventivo aos tratamentos especializados.
          </p>
          <div data-hero-cta className="mt-9 flex flex-wrap gap-3">
            <MagneticButton onClick={() => go('tratamentos')} icon={<ArrowDownRight size={18} aria-hidden="true" />}>
              Conheça nossos tratamentos
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => go('contato')}>
              Entre em contato
            </MagneticButton>
          </div>
        </div>

        {/* Mobile: imagem em máscara orgânica */}
        <div className="relative mt-12 lg:hidden">
          <div data-hero-mobile-frame className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11]" style={{ borderRadius: '46% 54% 40% 60% / 34% 30% 40% 36%' }}>
            <div data-hero-reveal className="absolute inset-0">
              <div data-hero-photo className="absolute inset-0">
                <DentalImage id="hero" sizes="100vw" tagPosition="bc" />
              </div>
            </div>
          </div>
        </div>

        {/* Elementos flutuantes */}
        <ul aria-label="Nossos princípios" className="relative z-[4] -mt-16 flex flex-col items-start gap-2.5 pb-16 lg:static lg:mt-0 lg:pb-0">
          {chips.map(({ icon: Icon, label, pos }, i) => (
            <li key={label} data-hero-chip className={`lg:absolute ${pos} ${i === 1 ? 'ml-6' : i === 2 ? 'ml-12' : ''} lg:ml-0`}>
              <span className="chip animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-sage/35 text-petrol">
                  <Icon size={15} aria-hidden="true" />
                </span>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Indicador de scroll */}
      <div data-hero-scroll aria-hidden="true" className="absolute bottom-8 left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-petrol/60">Role</span>
        <span className="relative block h-12 w-px overflow-hidden bg-petrol/15">
          <span className="animate-scroll-cue absolute inset-0 block bg-petrol" />
        </span>
      </div>
    </section>
  );
}
