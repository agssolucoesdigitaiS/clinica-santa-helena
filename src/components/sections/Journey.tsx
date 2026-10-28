import { useRef } from 'react';
import { journey } from '@/data/content';
import { DentalImage } from '@/components/ui/DentalImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { gsap, MQ, useGSAP } from '@/lib/gsap';

/* Estados da moldura (desktop) para cada etapa — a composição muda progressivamente. */
const FRAMES = [
  { left: '52%', top: '16%', width: '40%', height: '70%', borderRadius: '220px' },
  { left: '34%', top: '20%', width: '60%', height: '62%', borderRadius: '36px' },
  { left: '6%', top: '14%', width: '46%', height: '72%', borderRadius: '50%' },
  { left: '3%', top: '5%', width: '94%', height: '90%', borderRadius: '40px' },
];
const CARDS = [
  { left: '4%', top: '34%' },
  { left: '4%', top: '30%' },
  { left: '58%', top: '30%' },
  { left: '6%', top: '56%' },
];

export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const steps = journey.length;
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut', duration: 1 },
          scrollTrigger: {
            trigger: '[data-jr-pin]',
            start: 'top top',
            end: `+=${steps * 90}%`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            snap: { snapTo: 1 / (steps - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut', delay: 0.05 },
          },
        });
        gsap.set('[data-jr-frame]', FRAMES[0]);
        gsap.set('[data-jr-card]', CARDS[0]);
        gsap.set('[data-jr-img]', { clipPath: 'circle(0% at 50% 50%)' });
        gsap.set('[data-jr-img="0"]', { clipPath: 'circle(100% at 50% 50%)' });
        gsap.set('[data-jr-text]', { autoAlpha: 0, y: 40 });
        gsap.set('[data-jr-text="0"]', { autoAlpha: 1, y: 0 });
        gsap.set('[data-jr-line]', { strokeDashoffset: 1 });

        tl.to('[data-jr-line]', { strokeDashoffset: 0, ease: 'none', duration: steps - 1 }, 0);
        for (let i = 1; i < steps; i++) {
          const at = i - 1;
          tl.to('[data-jr-frame]', { ...FRAMES[i] }, at)
            .to('[data-jr-card]', { ...CARDS[i] }, at)
            .to(`[data-jr-img="${i}"]`, { clipPath: 'circle(100% at 50% 50%)' }, at)
            .fromTo(`[data-jr-img="${i}"] > div`, { scale: 1.3 }, { scale: 1 }, at)
            .to(`[data-jr-text="${i - 1}"]`, { autoAlpha: 0, y: -40, duration: 0.4 }, at)
            .to(`[data-jr-text="${i}"]`, { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.45)
            .to(`[data-jr-dot="${i}"]`, { backgroundColor: '#334C4B', scale: 1.4, duration: 0.3 }, at + 0.5);
        }
      });

      mm.add(MQ.mobile, () => {
        gsap.fromTo(
          '[data-jr-mline]',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-jr-mobile]', start: 'top 70%', end: 'bottom 70%', scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>('[data-jr-mcard]').forEach((card) => {
          gsap.from(card.querySelector('[data-jr-mimg]'), {
            clipPath: 'inset(30% 30% 30% 30% round 200px)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 80%', once: true },
          });
          gsap.from(card.querySelectorAll('[data-jr-mtext] > *'), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 75%', once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative bg-ivory">
      <div className="container-x pb-10 pt-24 lg:pb-16 lg:pt-36">
        <Eyebrow index="04">Nosso jeito de cuidar</Eyebrow>
        <RevealText as="h2" id="journey-title" className="mt-6 max-w-4xl text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
          Do primeiro contato ao <em className="serif-accent normal-case text-petrol">acompanhamento.</em>
        </RevealText>
      </div>

      {/* Desktop: painel fixo com transformação de layout */}
      <div data-jr-pin className="relative hidden h-[100svh] overflow-hidden lg:motion-safe:block">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path
            data-jr-line
            pathLength={1}
            strokeDasharray="1"
            d="M40 120 C 300 40, 520 260, 720 200 S 1100 40, 1240 260 S 1100 700, 760 640 S 260 860, 80 760"
            fill="none"
            stroke="#A6BDB5"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div data-jr-frame className="absolute z-[1] overflow-hidden shadow-soft">
          {journey.map((s, i) => (
            <div key={s.n} data-jr-img={i} className="absolute inset-0">
              <div className="h-full w-full">
                <DentalImage id={s.image} sizes="90vw" tagPosition="br" />
              </div>
            </div>
          ))}
        </div>

        <div data-jr-card className="glass absolute z-[4] w-[min(34%,460px)] rounded-[32px] p-8">
          <div className="relative min-h-[230px]">
            {journey.map((s, i) => (
              <div key={s.n} data-jr-text={i} className="absolute inset-0">
                <p className="font-display text-7xl font-medium leading-none tracking-[-0.05em] text-sage">{s.n}</p>
                <h3 className="mt-4 font-display text-fluid-xl font-medium text-deep">{s.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-petrol/80">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3" aria-hidden="true">
            {journey.map((s, i) => (
              <span key={s.n} data-jr-dot={i} className="h-2 w-2 rounded-full" style={{ background: i === 0 ? '#334C4B' : '#A6BDB5' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / movimento reduzido: etapas empilhadas */}
      <ol data-jr-mobile className="container-x relative space-y-14 pb-24 lg:motion-safe:hidden lg:mx-auto lg:max-w-3xl">
        <svg aria-hidden="true" className="pointer-events-none absolute bottom-24 left-5 top-0 w-6 sm:left-8" viewBox="0 0 24 1000" preserveAspectRatio="none">
          <path data-jr-mline pathLength={1} strokeDasharray="1" d="M12 0 C 24 250, 0 500, 12 750 S 12 1000, 12 1000" fill="none" stroke="#A6BDB5" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </svg>
        {journey.map((s, i) => (
          <li key={s.n} data-jr-mcard className="relative pl-10">
            <div data-jr-mimg className="aspect-[4/3] overflow-hidden" style={{ borderRadius: i % 2 ? '36px' : '140px 140px 36px 36px' }}>
              <DentalImage id={s.image} sizes="90vw" />
            </div>
            <div data-jr-mtext className="mt-6">
              <p className="font-display text-5xl font-medium leading-none tracking-[-0.05em] text-sage">{s.n}</p>
              <h3 className="mt-3 font-display text-fluid-xl font-medium text-deep">{s.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-petrol/80">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
