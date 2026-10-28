import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { activeTreatments, getTreatment } from '@/data/treatments';
import { DentalImage } from '@/components/ui/DentalImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { Reveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';
import { MagneticLink } from '@/components/animations/MagneticButton';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import NotFound from './NotFound';

export default function TreatmentPage() {
  const { slug = '' } = useParams();
  const t = getTreatment(slug);
  const ref = useRef<HTMLDivElement>(null);
  useDocumentMeta({ title: t?.title ?? 'Tratamento não encontrado', description: t?.description ?? '', path: `/tratamentos/${slug}` });

  useGSAP(
    () => {
      if (!t || prefersReducedMotion()) return;
      gsap.fromTo('[data-tp-hero]', { clipPath: 'ellipse(0% 0% at 70% 60%)' }, { clipPath: 'ellipse(120% 120% at 70% 60%)', duration: 1.8, ease: 'expo.inOut', delay: 0.15 });
      gsap.from('[data-tp-num]', { yPercent: 100, duration: 1.4, ease: 'expo.out', delay: 0.2 });
      gsap.fromTo(
        '[data-tp-line]',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '[data-tp-steps]', start: 'top 70%', end: 'bottom 60%', scrub: true } },
      );
    },
    { scope: ref, dependencies: [slug] },
  );

  if (!t) return <NotFound />;
  const idx = activeTreatments.findIndex((x) => x.slug === t.slug);
  const prev = activeTreatments[(idx - 1 + activeTreatments.length) % activeTreatments.length];
  const next = activeTreatments[(idx + 1) % activeTreatments.length];

  return (
    <div ref={ref} key={slug} style={{ backgroundColor: t.tint }}>
      <section className="container-x pb-16 pt-32 lg:pt-40" aria-labelledby="tp-title">
        <nav aria-label="Trilha de navegação" className="mb-10 text-sm text-petrol/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-deep">Início</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/#tratamentos" className="hover:text-deep">Tratamentos</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-deep">{t.title}</li>
          </ol>
        </nav>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="overflow-hidden font-display text-[clamp(5rem,14vw,12rem)] font-medium leading-[0.8] tracking-[-0.06em] text-sage" aria-hidden="true">
              <span data-tp-num className="block">{t.number}</span>
            </p>
            <RevealText as="h1" id="tp-title" trigger="mount" delay={0.3} className="mt-6 text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
              {t.title}
            </RevealText>
            <RevealText as="p" by="words" trigger="mount" delay={0.6} className="mt-6 max-w-xl text-fluid-lg leading-relaxed text-petrol/80">
              {t.page.intro}
            </RevealText>
          </div>
          <div className="lg:col-span-6">
            <div data-tp-hero className="aspect-[4/3] overflow-hidden" style={{ borderRadius: '44% 56% 36px 36px / 50% 50% 36px 36px' }}>
              <Parallax speed={10} scale className="h-full">
                <DentalImage id={t.image} priority sizes="(min-width:1024px) 50vw, 92vw" tagPosition="bc" />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-28" aria-label="Detalhes do tratamento">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-6">
            {t.page.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.08}>
                <Eyebrow index={String(i + 1).padStart(2, '0')}>{s.heading}</Eyebrow>
                <p className="mt-5 text-fluid-base leading-relaxed text-petrol/85">{s.body}</p>
              </Reveal>
            ))}
            <p className="rounded-2xl border border-petrol/10 bg-white p-5 text-sm leading-relaxed text-petrol/75">
              Conteúdo educativo. A indicação, as etapas e os prazos dependem de avaliação odontológica individual. Serviço sujeito à confirmação da clínica.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="font-display text-fluid-xl font-medium text-deep">Como costuma acontecer</h2>
            <ol data-tp-steps className="relative mt-8 space-y-8 pl-10">
              <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-petrol/10" />
              <span data-tp-line aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-petrol" />
              {t.page.steps.map((s, i) => (
                <li key={s} className="relative">
                  <span className="absolute -left-10 top-0 grid h-6 w-6 place-items-center rounded-full bg-sage font-display text-xs font-semibold text-deep">{i + 1}</span>
                  <p className="font-display text-fluid-lg font-medium text-deep">{s}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <MagneticLink to="/#contato" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
                Entrar em contato
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Outros tratamentos" className="border-t border-petrol/10 bg-ivory">
        <div className="container-x grid grid-cols-2 gap-4 py-10">
          <Link to={`/tratamentos/${prev.slug}`} className="group flex flex-col gap-2">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sage-ink">
              <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" /> Anterior
            </span>
            <span className="font-display text-fluid-lg font-medium text-deep">{prev.title}</span>
          </Link>
          <Link to={`/tratamentos/${next.slug}`} className="group flex flex-col items-end gap-2 text-right">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sage-ink">
              Próximo <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="font-display text-fluid-lg font-medium text-deep">{next.title}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
