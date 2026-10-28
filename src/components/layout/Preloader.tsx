import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { images } from '@/data/images';
import { LOGO_PATH } from '@/components/ui/Logo';
import { prefersReducedMotion } from '@/lib/env';

/**
 * Preloader: o progresso corresponde aos recursos críticos reais
 * (fontes, documento e imagem principal quando houver fotografia).
 * Uma linha curva é desenhada conforme o progresso, transforma-se no
 * símbolo da clínica e a tela se abre com uma máscara circular.
 */
export function Preloader({ onDone, onReveal }: { onDone: () => void; onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const curve = useRef<SVGPathElement>(null);
  const mark = useRef<SVGPathElement>(null);
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    const html = document.documentElement;
    html.style.overflow = 'hidden';

    const tasks: Promise<unknown>[] = [];
    tasks.push(document.fonts ? document.fonts.ready : Promise.resolve());
    tasks.push(
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true })),
    );
    const hero = images.hero.photo;
    if (hero) {
      tasks.push(
        new Promise<void>((r) => {
          const im = new Image();
          im.src = `${hero.base}-${hero.widths[hero.widths.length - 1]}.jpg`;
          im.decode().then(() => r(), () => r());
        }),
      );
    }
    // pequeno tempo mínimo para a leitura da marca
    tasks.push(new Promise((r) => setTimeout(r, reduce ? 50 : 250)));

    if (!reduce) gsap.set('[data-pl-name] span', { yPercent: 110 });
    const total = tasks.length;
    let completed = 0;
    const progress = { v: 0 };
    const len = curve.current?.getTotalLength() ?? 600;
    if (curve.current) gsap.set(curve.current, { strokeDasharray: len, strokeDashoffset: len });
    const markLen = mark.current?.getTotalLength() ?? 120;
    if (mark.current) gsap.set(mark.current, { strokeDasharray: markLen, strokeDashoffset: markLen });

    const update = () => {
      gsap.to(progress, {
        v: completed / total,
        duration: reduce ? 0 : 0.35,
        ease: 'power2.out',
        onUpdate: () => {
          setPct(Math.round(progress.v * 100));
          if (curve.current) curve.current.style.strokeDashoffset = String(len * (1 - progress.v));
        },
        onComplete: () => {
          if (completed === total) finish();
        },
      });
    };
    tasks.forEach((t) =>
      t.then(() => {
        completed += 1;
        update();
      }),
    );
    const safety = window.setTimeout(() => {
      completed = total;
      update();
    }, 7000);

    function finish() {
      if (done.current) return;
      done.current = true;
      window.clearTimeout(safety);
      const el = root.current;
      if (!el) return;
      if (reduce) {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            html.style.overflow = '';
            onReveal();
            onDone();
          },
        });
        return;
      }
      const tl = gsap.timeline({
        onComplete: () => {
          onDone();
        },
      });
      tl.to(curve.current, { opacity: 0, scaleX: 0.3, transformOrigin: '50% 50%', duration: 0.45, ease: 'power3.inOut' })
        .to(mark.current, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, '<0.05')
        .to('[data-pl-name] span', { yPercent: 0, duration: 0.7, stagger: 0.03, ease: 'expo.out' }, '-=0.55')
        .to('[data-pl-pct]', { autoAlpha: 0, duration: 0.3 }, '<')
        .to('[data-pl-inner]', { scale: 0.92, autoAlpha: 0, duration: 0.4, ease: 'power3.in' }, '+=0.05')
        .call(() => {
          html.style.overflow = '';
          onReveal();
        })
        .fromTo(el, { '--r': '0vmax' }, { '--r': '150vmax', duration: 1, ease: 'expo.inOut' }, '-=0.25');
    }

    return () => {
      window.clearTimeout(safety);
      html.style.overflow = '';
    };
  }, [onDone, onReveal]);

  const name = 'Santa Helena';
  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] grid place-items-center bg-ivory"
      style={
        {
          '--r': '0vmax',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent var(--r), #000 calc(var(--r) + 1px))',
          maskImage: 'radial-gradient(circle at 50% 50%, transparent var(--r), #000 calc(var(--r) + 1px))',
        } as React.CSSProperties
      }
      role="status"
      aria-live="polite"
      aria-label={`Carregando ${pct}%`}
    >
      <div data-pl-inner className="flex flex-col items-center text-petrol" aria-hidden="true">
        <svg viewBox="0 0 320 120" className="h-[120px] w-[320px] max-w-[80vw] overflow-visible">
          <path
            ref={curve}
            d="M10 70 C 60 10, 100 110, 160 60 S 260 20, 310 64"
            fill="none"
            stroke="#A6BDB5"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <g transform="translate(124 24) scale(2.25)">
            <path ref={mark} d={LOGO_PATH} fill="none" stroke="#334C4B" strokeWidth={0.9} strokeLinejoin="round" strokeLinecap="round" />
          </g>
        </svg>
        <p data-pl-name className="mt-6 flex overflow-hidden font-display text-3xl font-medium tracking-tight">
          {name.split('').map((c, i) => (
            <span key={i} className="inline-block" style={{ whiteSpace: 'pre' }}>
              {c}
            </span>
          ))}
        </p>
        <p data-pl-pct className="mt-3 font-body text-xs font-semibold tabular-nums tracking-[0.2em] text-sage-ink">
          {String(pct).padStart(3, '0')}%
        </p>
      </div>
    </div>
  );
}
