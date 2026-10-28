import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import { clinic, isPending } from '@/data/clinic';
import { activeTreatments } from '@/data/treatments';
import { navLinks } from '@/data/content';
import { Logo } from '@/components/ui/Logo';
import { Pending } from '@/components/ui/Eyebrow';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { useSectionNav } from './Header';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const go = useSectionNav();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '[data-wordmark] span',
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'none',
          stagger: 0.03,
          scrollTrigger: { trigger: '[data-wordmark]', start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
        },
      );
    },
    { scope: ref },
  );

  const { address, contact, hours, technicalLead } = clinic;
  const addressLine = [address.street, address.district, address.zip].filter(Boolean).join(' · ');

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ivory pt-20 text-deep" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Rodapé
      </h2>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-petrol">{clinic.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-petrol/70">
            {clinic.city}/{clinic.state}. Atendimento odontológico com escuta, orientação e acompanhamento.
          </p>
        </div>

        <nav aria-label="Rodapé — navegação" className="lg:col-span-2">
          <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-sage-ink">Navegação</h3>
          <ul className="space-y-2.5 text-[15px]">
            {navLinks.map((l) => (
              <li key={l.hash}>
                <a
                  href={`/#${l.hash}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.hash);
                  }}
                  className="text-petrol/80 transition-colors hover:text-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/conteudos" className="text-petrol/80 transition-colors hover:text-deep">
                Conteúdos
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Rodapé — tratamentos" className="lg:col-span-3">
          <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-sage-ink">Tratamentos</h3>
          <ul className="space-y-2.5 text-[15px]">
            {activeTreatments.map((t) => (
              <li key={t.slug}>
                <Link to={`/tratamentos/${t.slug}`} className="text-petrol/80 transition-colors hover:text-deep">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-5 text-[15px] lg:col-span-3">
          <h3 className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-sage-ink">Atendimento</h3>
          <div className="flex gap-3">
            <Clock size={18} className="mt-0.5 shrink-0 text-sage-ink" aria-hidden="true" />
            <div>
              {hours ? (
                hours.map((h) => (
                  <p key={h.days}>
                    {h.days}: {h.hours}
                  </p>
                ))
              ) : (
                <Pending>Horários de atendimento</Pending>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Phone size={18} className="mt-0.5 shrink-0 text-sage-ink" aria-hidden="true" />
            {contact.phone ? <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>{contact.phone}</a> : <Pending>Telefone</Pending>}
          </div>
          <div className="flex gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-sage-ink" aria-hidden="true" />
            <div>
              {addressLine ? <p>{addressLine}</p> : <Pending>Endereço</Pending>}
              <p className="text-petrol/70">
                {clinic.city}/{clinic.state}
              </p>
              {address.mapUrl && (
                <a href={address.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 font-semibold text-petrol underline-offset-4 hover:underline">
                  Ver no mapa <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-x mt-14 grid gap-6 border-t border-petrol/10 pt-8 text-[13px] leading-relaxed text-petrol/75 lg:grid-cols-2">
        <div className="space-y-1.5">
          <p>
            <strong className="font-semibold text-deep">Dados da clínica: </strong>
            {isPending(clinic.legalName) ? <Pending>Razão social</Pending> : clinic.legalName} ·{' '}
            {isPending(clinic.cnpj) ? <Pending>CNPJ</Pending> : `CNPJ ${clinic.cnpj}`} ·{' '}
            {isPending(clinic.croClinic) ? <Pending>Inscrição CRO da clínica</Pending> : clinic.croClinic}
          </p>
          <p>
            <strong className="font-semibold text-deep">Responsável técnico: </strong>
            {isPending(technicalLead.name) ? <Pending>Nome</Pending> : technicalLead.name} ·{' '}
            {isPending(technicalLead.cro) ? <Pending>CRO</Pending> : `CRO ${technicalLead.cro}`}
          </p>
        </div>
        <div className="space-y-1.5 lg:text-right">
          <p>
            Conteúdo de caráter educativo. As informações deste site não substituem avaliação odontológica individual.{' '}
            <Link to="/privacidade" className="font-semibold text-petrol underline underline-offset-4">
              Política de privacidade
            </Link>
          </p>
          <p>
            © {new Date().getFullYear()} {clinic.name}.{' '}
            {clinic.developerCredit.url ? (
              <a href={clinic.developerCredit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                {clinic.developerCredit.label}
              </a>
            ) : (
              clinic.developerCredit.label
            )}
          </p>
        </div>
      </div>

      <div data-wordmark aria-hidden="true" className="mt-10 select-none overflow-hidden px-3 pb-2">
        <p className="flex justify-center whitespace-nowrap font-display text-[15.5vw] font-semibold leading-[0.8] tracking-[-0.06em] text-petrol">
          {'Santa Helena'.split('').map((c, i) => (
            <span key={i} className="inline-block" style={{ whiteSpace: 'pre' }}>
              {c}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
