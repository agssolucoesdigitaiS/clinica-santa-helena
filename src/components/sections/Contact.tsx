import { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { clinic, whatsappLink } from '@/data/clinic';
import { ContactForm } from '@/components/forms/ContactForm';
import { DentalImage } from '@/components/ui/DentalImage';
import { Eyebrow, Pending } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { MagneticLink } from '@/components/animations/MagneticButton';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';

const WAVE_FROM = 'M0 0 L1440 0 L1440 40 C 1100 220, 340 220, 0 40 Z';
const WAVE_TO = 'M0 0 L1440 0 L1440 0 C 1100 0, 340 0, 0 0 Z';

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const wa = whatsappLink();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '[data-ct-wave]',
        { attr: { d: WAVE_FROM } },
        { attr: { d: WAVE_TO }, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 95%', end: 'top 20%', scrub: true } },
      );
      gsap.fromTo(
        '[data-ct-blob]',
        { scale: 0.4, rotate: -20 },
        { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'center center', scrub: true } },
      );
      gsap.from('[data-ct-form]', {
        clipPath: 'inset(8% 8% 8% 8% round 80px)',
        y: 60,
        autoAlpha: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-ct-form]', start: 'top 85%', once: true },
      });
      gsap.from('[data-ct-img]', {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-ct-img]', start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="contato" aria-labelledby="contact-title" className="relative overflow-hidden bg-deep pb-24 pt-32 text-ivory lg:pb-36 lg:pt-48">
      <svg aria-hidden="true" className="absolute inset-x-0 top-0 h-[clamp(60px,12vw,200px)] w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path data-ct-wave d={WAVE_FROM} fill="#FFFFFF" />
      </svg>
      <div
        data-ct-blob
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20vmax] top-[10%] h-[60vmax] w-[60vmax] bg-[radial-gradient(circle,rgba(166,189,181,0.22),transparent_62%)]"
        style={{ borderRadius: '42% 58% 46% 54% / 52% 44% 56% 48%' }}
      />

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow index="08" light>
            Contato e agendamento
          </Eyebrow>
          <RevealText as="h2" id="contact-title" className="mt-6 text-fluid-3xl font-medium uppercase leading-[0.95]">
            O próximo passo começa com uma <em className="serif-accent normal-case text-sage">conversa.</em>
          </RevealText>
          <p className="mt-6 max-w-md text-fluid-base leading-relaxed text-ivory/75">
            Entre em contato para conhecer nossos atendimentos e obter informações sobre agendamentos.
          </p>

          <div data-ct-img className="mt-10 aspect-[16/11] overflow-hidden" style={{ borderRadius: '48% 52% 40% 60% / 56% 50% 50% 44%' }}>
            <DentalImage id="closing" sizes="(min-width:1024px) 38vw, 92vw" tagPosition="bc" />
          </div>

          <div className="mt-8 rounded-[28px] border border-ivory/10 bg-ivory/[0.04] p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage/20 text-sage">
                <MessageCircle size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-medium">Prefere o WhatsApp?</h3>
                <p className="mt-1 text-sm leading-relaxed text-ivory/65">Fale com a recepção pelo número oficial da clínica.</p>
                <div className="mt-4">
                  {wa ? (
                    <MagneticLink to={wa} variant="light">
                      Conversar no WhatsApp
                    </MagneticLink>
                  ) : (
                    <div className="space-y-2">
                      <button type="button" disabled className="inline-flex min-h-[48px] cursor-not-allowed items-center rounded-full bg-ivory/20 px-6 font-display text-[15px] text-ivory/60">
                        Conversar no WhatsApp
                      </button>
                      <p>
                        <Pending light>Número oficial a configurar em src/data/clinic.ts</Pending>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-ivory/45">
            {clinic.name} · {clinic.city}/{clinic.state}
          </p>
        </div>

        <div data-ct-form className="rounded-[36px] border border-ivory/10 bg-petrol/60 p-6 backdrop-blur sm:p-10 lg:col-span-7">
          <h3 className="font-display text-fluid-xl font-medium">Envie uma mensagem</h3>
          <p className="mb-8 mt-2 text-sm text-ivory/60">Responderemos com informações sobre atendimento e disponibilidade.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
