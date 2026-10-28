import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { activeTreatments } from '@/data/treatments';
import { DentalImage } from '@/components/ui/DentalImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { MagneticLink } from '@/components/animations/MagneticButton';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';

/** Número de dois dígitos que "rola" até o valor. */
function RollingNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>('[data-strip]').forEach((strip, i) => {
      const digit = Number(value[i]);
      gsap.to(strip, { yPercent: -digit * 10, duration: prefersReducedMotion() ? 0 : 1.1, ease: 'expo.inOut', delay: i * 0.06 });
    });
  }, [value]);
  return (
    <span ref={ref} className="inline-flex overflow-hidden leading-none" aria-hidden="true">
      {[0, 1].map((i) => (
        <span key={i} className="relative inline-block h-[1em] overflow-hidden">
          <span data-strip className="flex flex-col">
            {Array.from({ length: 10 }).map((_, d) => (
              <span key={d} className="block h-[1em]">
                {d}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Treatments() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = activeTreatments[active];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-tr-item]', {
        x: -30,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-tr-list]', start: 'top 80%', once: true },
      });
      gsap.from('[data-tr-stage]', {
        clipPath: 'inset(20% 20% 20% 20% round 200px)',
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-tr-stage]', start: 'top 80%', once: true },
      });
    },
    { scope: root },
  );

  // transições ao trocar de tratamento
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const d = reduce ? 0 : 1;
    gsap.to(el, { backgroundColor: t.tint, duration: 1.2 * d, ease: 'power2.out' });
    const imgs = el.querySelectorAll<HTMLElement>('[data-tr-img]');
    const from = prev.current;
    imgs.forEach((img, i) => {
      if (i === active) {
        gsap.set(img, { zIndex: 2, autoAlpha: 1 });
        if (from !== active && !reduce) {
          const dir = active > from ? '100%' : '0%';
          gsap.fromTo(img, { clipPath: `ellipse(0% 0% at 50% ${dir})` }, { clipPath: `ellipse(130% 130% at 50% ${dir})`, duration: 1.3, ease: 'expo.inOut' });
          gsap.fromTo(img.firstElementChild, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' });
        } else gsap.set(img, { clipPath: 'none' });
      } else if (i === from) {
        gsap.set(img, { zIndex: 1 });
        gsap.to(img.firstElementChild, { scale: 0.92, duration: 1.3 * d, ease: 'expo.inOut' });
        gsap.to(img, { autoAlpha: 0, duration: 0.01, delay: 1.3 * d });
      } else gsap.set(img, { zIndex: 0, autoAlpha: 0 });
    });
    if (!reduce && from !== active) {
      gsap.fromTo('[data-tr-desc] [data-line]', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07, ease: 'expo.out', delay: 0.15 });
    }
    prev.current = active;
  }, [active, t.tint]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = activeTreatments.length;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section ref={root} id="tratamentos" aria-labelledby="treat-title" className="relative overflow-hidden py-24 lg:py-36" style={{ backgroundColor: activeTreatments[0].tint }}>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow index="02">Tratamentos odontológicos</Eyebrow>
            <RevealText as="h2" id="treat-title" className="mt-6 max-w-3xl text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
              Cuidado para cada <em className="serif-accent normal-case text-petrol">etapa</em> do sorriso.
            </RevealText>
          </div>
          <p className="font-display text-[clamp(4.5rem,12vw,11rem)] font-medium leading-none tracking-[-0.06em] text-petrol/90">
            <span className="sr-only">Tratamento {t.number}</span>
            <RollingNumber value={t.number} />
            <span className="ml-2 align-top font-serif text-2xl italic tracking-normal text-sage-ink" aria-hidden="true">
              /{String(activeTreatments.length).padStart(2, '0')}
            </span>
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          {/* Lista numerada */}
          <div data-tr-list role="tablist" aria-label="Tratamentos" aria-orientation="vertical" className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
            {activeTreatments.map((tr, i) => {
              const selected = i === active;
              return (
                <button
                  key={tr.slug}
                  data-tr-item
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${tr.slug}`}
                  aria-selected={selected}
                  aria-controls="treatment-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    'group relative flex shrink-0 snap-start items-baseline gap-4 rounded-full border px-4 py-2.5 text-left transition-colors duration-500 lg:rounded-none lg:border-0 lg:border-b lg:border-petrol/10 lg:px-0 lg:py-4',
                    selected ? 'border-petrol bg-petrol text-ivory lg:bg-transparent lg:text-deep' : 'border-petrol/15 text-petrol/60 hover:text-deep',
                  )}
                >
                  <span className={cn('font-serif text-base italic transition-colors', selected ? 'lg:text-petrol' : 'text-sage-ink')}>{tr.number}</span>
                  <span className={cn('font-display text-[15px] font-medium transition-transform duration-500 ease-organic lg:text-fluid-lg', selected && 'lg:translate-x-3')}>{tr.title}</span>
                  <span aria-hidden="true" className={cn('absolute bottom-[-1px] left-0 hidden h-[2px] origin-left bg-petrol transition-transform duration-700 ease-organic lg:block', selected ? 'w-full scale-x-100' : 'w-full scale-x-0')} />
                </button>
              );
            })}
          </div>

          {/* Fotografia */}
          <div data-tr-stage className="relative aspect-[4/5] overflow-hidden rounded-[40px] sm:aspect-[16/11] lg:col-span-5 lg:aspect-[4/5]">
            {activeTreatments.map((tr, i) => (
              <div key={tr.slug} data-tr-img className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}>
                <div className="h-full w-full will-change-transform">
                  <DentalImage id={tr.image} sizes="(min-width:1024px) 38vw, 92vw" />
                </div>
              </div>
            ))}
          </div>

          {/* Descrição */}
          <div id="treatment-panel" role="tabpanel" aria-labelledby={`tab-${t.slug}`} data-tr-desc className="flex flex-col justify-between lg:col-span-3" aria-live="polite">
            <div>
              <h3 className="overflow-hidden font-display text-fluid-xl font-medium leading-tight text-deep">
                <span data-line className="block">
                  {t.title}
                </span>
              </h3>
              <p className="mt-5 overflow-hidden text-fluid-base leading-relaxed text-petrol/80">
                <span data-line className="block">
                  {t.description}
                </span>
              </p>
              <p className="mt-6 overflow-hidden text-sm font-semibold text-sage-ink">
                <span data-line className="block">
                  {t.short}
                </span>
              </p>
            </div>
            <div className="mt-8 overflow-hidden">
              <div data-line>
                <MagneticLink to={`/tratamentos/${t.slug}`} variant="ghost" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
                  Saiba mais
                </MagneticLink>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-xs leading-relaxed text-petrol/60">
          Catálogo demonstrativo. A indicação de qualquer tratamento depende de avaliação odontológica individual.
        </p>
      </div>
    </section>
  );
}
