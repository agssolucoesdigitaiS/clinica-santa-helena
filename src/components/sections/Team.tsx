import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { team } from '@/data/content';
import { DentalImage } from '@/components/ui/DentalImage';
import { Eyebrow, Pending } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';

export function Team() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '[data-team-mask]',
        { clipPath: 'ellipse(80% 0% at 50% 100%)' },
        {
          clipPath: 'ellipse(160% 160% at 50% 100%)',
          duration: 1.8,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-team-row]', start: 'top 78%', once: true },
        },
      );
      gsap.from('[data-team-name] span', {
        yPercent: 110,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.15,
        delay: 0.5,
        scrollTrigger: { trigger: '[data-team-row]', start: 'top 78%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="equipe" aria-labelledby="team-title" className="relative bg-sand-soft/60 py-24 lg:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="05">Conheça nossa equipe</Eyebrow>
            <RevealText as="h2" id="team-title" className="mt-6 text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
              Pessoas que cuidam de <em className="serif-accent normal-case text-petrol">pessoas.</em>
            </RevealText>
          </div>
          <p className="text-[15px] leading-relaxed text-petrol/75 lg:col-span-4 lg:col-start-9">
            Perfis <strong className="font-semibold text-deep">ilustrativos</strong> para demonstração do layout. Antes da publicação, serão substituídos pelos profissionais reais da clínica, com registro no CRO e especialidades verificadas.
          </p>
        </div>

        <ul data-team-row className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:h-[min(78vh,720px)] lg:overflow-visible lg:px-0 lg:pb-0">
          {team.map((m, i) => {
            const expanded = open === i;
            return (
              <li
                key={m.name}
                className={cn(
                  'group relative w-[82vw] max-w-[380px] shrink-0 snap-center transition-[flex-grow] duration-[900ms] ease-organic sm:w-[56vw] lg:w-auto lg:max-w-none lg:shrink',
                  expanded ? 'lg:flex-[2.2]' : 'lg:flex-1',
                )}
                onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setOpen(i)}
              >
                <div data-team-mask className="relative h-[520px] overflow-hidden rounded-[36px] lg:h-full">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.04]">
                    <DentalImage id={m.image} sizes="(min-width:1024px) 45vw, 82vw" tagPosition="tl" />
                  </div>
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory lg:p-8">
                    <span className="mb-3 inline-flex rounded-full bg-sand/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-deep">Perfil ilustrativo</span>
                    <h3 data-team-name className="overflow-hidden font-display text-fluid-xl font-medium leading-tight">
                      <span className="block">{m.name}</span>
                    </h3>
                    <p className="mt-1 text-sm text-ivory/75">{m.role}</p>
                    <div
                      id={`team-bio-${i}`}
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-700 ease-organic',
                        expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/85">{m.bio}</p>
                        <p className="mt-3 text-xs text-ivory/70">
                          {m.cro ? `CRO ${m.cro}` : <Pending light>CRO a preencher</Pending>}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`team-bio-${i}`}
                    aria-label={`${expanded ? 'Recolher' : 'Expandir'} perfil de ${m.name}`}
                    onClick={() => setOpen(i)}
                    className="absolute right-5 top-5 hidden h-11 w-11 place-items-center rounded-full bg-white/85 text-petrol backdrop-blur transition-transform duration-500 lg:grid"
                  >
                    <Plus size={18} aria-hidden="true" className={cn('transition-transform duration-500', expanded && 'rotate-45')} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
