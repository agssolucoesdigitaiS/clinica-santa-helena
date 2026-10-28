import { useRef } from 'react';
import { DentalImage } from '@/components/ui/DentalImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { Reveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';

const CURVE_FROM = 'M0 160 C 360 0, 1080 0, 1440 160 L1440 161 L0 161 Z';
const CURVE_TO = 'M0 160 C 360 150, 1080 150, 1440 160 L1440 161 L0 161 Z';

const values = [
  { k: 'Escuta', v: 'Cada atendimento começa entendendo o que você precisa.' },
  { k: 'Clareza', v: 'Explicações sobre etapas, alternativas e cuidados.' },
  { k: 'Continuidade', v: 'Acompanhamento conforme as suas necessidades.' },
];

export function Welcome() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '[data-welcome-curve]',
        { attr: { d: CURVE_FROM } },
        { attr: { d: CURVE_TO }, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 30%', scrub: true } },
      );
      gsap.from('[data-welcome-value]', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-welcome-values]', start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="clinica" aria-labelledby="welcome-title" className="relative z-[5] -mt-[1px] bg-ivory pb-24 lg:-mt-[18vh] lg:pb-40">
      <svg aria-hidden="true" className="absolute inset-x-0 -top-[clamp(40px,11vw,160px)] block h-[clamp(40px,11vw,160px)] w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
        <path data-welcome-curve d={CURVE_FROM} fill="#F7F5F0" />
      </svg>

      <div className="container-x grid gap-14 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <div className="lg:col-span-5 lg:pt-10">
          <Eyebrow index="01">Bem-vindo à Santa Helena</Eyebrow>
          <RevealText as="h2" id="welcome-title" className="mt-6 text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
            Um ambiente pensado para <em className="serif-accent normal-case text-petrol">cuidar</em> de você.
          </RevealText>
          <RevealText as="p" by="words" className="mt-8 max-w-lg text-fluid-base leading-relaxed text-petrol/80">
            Na Santa Helena, cada atendimento começa com uma conversa. Nosso conceito de cuidado valoriza a escuta, o esclarecimento das dúvidas e a atenção às necessidades de cada paciente.
          </RevealText>
          <dl data-welcome-values className="mt-12 grid gap-6 border-t border-petrol/10 pt-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {values.map((item) => (
              <div key={item.k} data-welcome-value>
                <dt className="font-serif text-2xl text-petrol">{item.k}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-petrol/70">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Galeria assimétrica */}
        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-6 gap-4 sm:gap-5">
            <Reveal variant="mask" className="col-span-6 sm:col-span-4" start="top 85%">
              <Parallax speed={14} scale className="aspect-[4/5] overflow-hidden" >
                <div className="h-full w-full overflow-hidden" style={{ borderRadius: '48% 52% 12% 12% / 30% 30% 4% 4%' }}>
                  <DentalImage id="welcomeReception" sizes="(min-width:1024px) 40vw, 90vw" />
                </div>
              </Parallax>
            </Reveal>
            <div className="col-span-6 flex flex-col gap-4 sm:col-span-2 sm:gap-5 sm:pt-28">
              <Reveal variant="curtain" delay={0.15} start="top 90%">
                <Parallax speed={22} className="aspect-[3/4] overflow-hidden rounded-[32px]">
                  <DentalImage id="welcomeRoom" sizes="(min-width:1024px) 20vw, 90vw" tagPosition="tl" />
                </Parallax>
              </Reveal>
              <Reveal variant="scale" delay={0.3} start="top 92%">
                <div className="mx-auto aspect-square w-[78%] overflow-hidden rounded-full shadow-soft sm:-ml-[30%] sm:w-[130%]">
                  <DentalImage id="welcomeConsult" sizes="(min-width:1024px) 20vw, 70vw" tagPosition="bc" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
