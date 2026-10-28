import { useEffect, useRef, useState } from 'react';
import { faq } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { Reveal } from '@/components/animations/Reveal';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';

function Item({ q, a, i, open, onToggle }: { q: string; a: string; i: number; open: boolean; onToggle: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // expansão fluida com GSAP (altura automática)
  const animate = (willOpen: boolean) => {
    const el = panel.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    if (willOpen) {
      gsap.set(el, { display: 'block' });
      gsap.fromTo(el, { height: 0 }, { height: 'auto', duration: reduce ? 0 : 0.7, ease: 'expo.out' });
      gsap.fromTo(inner.current, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.08, ease: 'expo.out' });
    } else {
      gsap.to(el, { height: 0, duration: reduce ? 0 : 0.55, ease: 'expo.inOut', onComplete: () => {
          gsap.set(el, { display: 'none' });
        } });
    }
  };

  const initial = useRef(open);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    animate(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="border-b" style={{ borderColor: 'rgba(51,76,75,0.12)' }}>
      <h3>
        <button
          type="button"
          id={`faq-q-${i}`}
          aria-expanded={open}
          aria-controls={`faq-a-${i}`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left lg:py-7"
        >
          <span className="flex items-baseline gap-4">
            <span className="font-serif text-lg italic text-sage-ink">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-display text-fluid-lg font-medium text-deep transition-colors group-hover:text-petrol">{q}</span>
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'relative grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-organic',
              open ? 'rotate-180 border-petrol bg-petrol' : 'border-petrol/20 bg-transparent group-hover:border-petrol',
            )}
          >
            <span className={cn('absolute h-[1.5px] w-4 transition-colors', open ? 'bg-ivory' : 'bg-petrol')} />
            <span className={cn('absolute h-4 w-[1.5px] transition-transform duration-500 ease-organic', open ? 'scale-y-0 bg-ivory' : 'bg-petrol')} />
          </span>
        </button>
      </h3>
      <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} ref={panel} className="overflow-hidden" style={{ display: initial.current ? 'block' : 'none', height: initial.current ? 'auto' : 0 }}>
        <div ref={inner} className="max-w-2xl pb-7 pl-10 text-fluid-base leading-relaxed text-petrol/80">
          {a}
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="relative bg-ivory py-24 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index="06">Perguntas frequentes</Eyebrow>
            <RevealText as="h2" id="faq-title" className="mt-6 text-fluid-2xl font-medium uppercase leading-[0.98] text-deep">
              Informação também faz parte do <em className="serif-accent normal-case text-petrol">cuidado.</em>
            </RevealText>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-petrol/70">
              Respostas gerais e educativas. Cada situação depende de avaliação odontológica individual.
            </p>
          </div>
        </div>
        <Reveal className="lg:col-span-8" childSelector="[data-faq-item]" stagger={0.07}>
          <div style={{ borderColor: 'rgba(51,76,75,0.12)' }} className="border-t">
            {faq.map((f, i) => (
              <div key={f.q} data-faq-item>
                <Item q={f.q} a={f.a} i={i} open={open === i} onToggle={() => setOpen((o) => (o === i ? null : i))} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
