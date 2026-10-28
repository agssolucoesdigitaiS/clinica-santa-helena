import { useId, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Info, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clinic } from '@/data/clinic';
import { activeTreatments } from '@/data/treatments';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { cn } from '@/lib/cn';

interface Values {
  name: string;
  email: string;
  whatsapp: string;
  interest: string;
  period: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
}

const empty: Values = { name: '', email: '', whatsapp: '', interest: '', period: '', message: '', consent: false, company: '' };

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(v: Values) {
  const e: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 3) e.name = 'Informe seu nome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Informe um e-mail válido.';
  const digits = v.whatsapp.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) e.whatsapp = 'Informe um número com DDD.';
  if (!v.interest) e.interest = 'Selecione uma opção.';
  if (!v.period) e.period = 'Selecione um período.';
  if (v.message.length > 600) e.message = 'Use até 600 caracteres.';
  if (!v.consent) e.consent = 'É necessário concordar para enviar.';
  return e;
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'demo' } | { kind: 'sent' } | { kind: 'error'; msg: string };

export function ContactForm() {
  const uid = useId();
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const formRef = useRef<HTMLFormElement>(null);
  const demo = !clinic.formEndpoint;

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched) setErrors(validate(next));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    if (v.company) return; // honeypot preenchido: provável spam
    if (demo) {
      setStatus({ kind: 'demo' });
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(clinic.formEndpoint as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, company: undefined, source: 'site', sentAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: 'sent' });
      setV(empty);
      setTouched(false);
    } catch {
      setStatus({ kind: 'error', msg: 'Não foi possível enviar agora. Tente novamente em instantes ou use o WhatsApp.' });
    }
  };

  const id = (k: string) => `${uid}-${k}`;
  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#F2C9B8]">
        <AlertCircle size={14} aria-hidden="true" /> {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Values) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? id(`${k}-err`) : undefined });

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby={demo ? id('demo') : undefined}>
      {demo && (
        <p id={id('demo')} className="flex gap-2 rounded-2xl border border-sand/40 bg-sand/10 px-4 py-3 text-[13px] leading-relaxed text-sand-soft">
          <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          Formulário em modo demonstrativo: ainda não está conectado a um sistema de envio. Nenhuma mensagem será enviada.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id('name')} className="field-label">
            Nome <span aria-hidden="true">*</span>
          </label>
          <input id={id('name')} className="field" autoComplete="name" value={v.name} onChange={(e) => set('name', e.target.value)} required {...aria('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor={id('email')} className="field-label">
            E-mail <span aria-hidden="true">*</span>
          </label>
          <input id={id('email')} type="email" className="field" autoComplete="email" inputMode="email" value={v.email} onChange={(e) => set('email', e.target.value)} required {...aria('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor={id('whatsapp')} className="field-label">
            WhatsApp <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('whatsapp')}
            type="tel"
            className="field"
            autoComplete="tel-national"
            inputMode="tel"
            placeholder="(11) 90000-0000"
            value={v.whatsapp}
            onChange={(e) => set('whatsapp', maskPhone(e.target.value))}
            required
            {...aria('whatsapp')}
          />
          {err('whatsapp')}
        </div>
        <div>
          <label htmlFor={id('interest')} className="field-label">
            Tipo de atendimento de interesse <span aria-hidden="true">*</span>
          </label>
          <select id={id('interest')} className="field appearance-none" value={v.interest} onChange={(e) => set('interest', e.target.value)} required {...aria('interest')}>
            <option value="" className="text-deep">
              Selecione
            </option>
            <option value="Primeira consulta / avaliação" className="text-deep">
              Primeira consulta / avaliação
            </option>
            {activeTreatments.map((t) => (
              <option key={t.slug} value={t.title} className="text-deep">
                {t.title}
              </option>
            ))}
            <option value="Outro" className="text-deep">
              Outro / não sei
            </option>
          </select>
          {err('interest')}
        </div>
        <fieldset>
          <legend className="field-label">
            Preferência de período <span aria-hidden="true">*</span>
          </legend>
          <div className="flex gap-2" role="radiogroup" {...aria('period')}>
            {['Manhã', 'Tarde', 'Noite'].map((p) => (
              <label
                key={p}
                className={cn(
                  'flex min-h-[48px] flex-1 cursor-pointer items-center justify-center rounded-2xl border text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-sage',
                  v.period === p ? 'border-sage bg-sage text-deep' : 'border-ivory/15 bg-ivory/[0.06] text-ivory/80 hover:border-ivory/40',
                )}
              >
                <input type="radio" name={id('period')} value={p} checked={v.period === p} onChange={() => set('period', p)} className="sr-only" />
                {p}
              </label>
            ))}
          </div>
          {err('period')}
        </fieldset>
        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className="field-label">
            Mensagem <span className="font-normal text-ivory/50">(opcional)</span>
          </label>
          <textarea
            id={id('message')}
            className="field min-h-[110px] resize-y"
            value={v.message}
            onChange={(e) => set('message', e.target.value)}
            maxLength={600}
            aria-describedby={id('message-hint')}
          />
          <p id={id('message-hint')} className="mt-1.5 text-[12px] text-ivory/50">
            Por segurança, não inclua dados de saúde ou informações clínicas aqui. Esses assuntos são tratados na consulta.
          </p>
          {err('message')}
        </div>
      </div>

      {/* honeypot anti-spam */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id('company')}>Empresa</label>
        <input id={id('company')} tabIndex={-1} autoComplete="off" value={v.company} onChange={(e) => set('company', e.target.value)} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ivory/80">
          <input
            type="checkbox"
            checked={v.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded accent-[#A6BDB5]"
            {...aria('consent')}
          />
          <span>
            Concordo com o uso destes dados para retorno de contato, conforme a{' '}
            <Link to="/privacidade" className="font-semibold text-ivory underline underline-offset-4">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {err('consent')}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <MagneticButton type="submit" variant="light" disabled={status.kind === 'sending'} icon={<Send size={16} aria-hidden="true" />}>
          {status.kind === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
        </MagneticButton>
        <p className="text-[12px] text-ivory/50">* Campos obrigatórios</p>
      </div>

      <div aria-live="polite" role="status">
        {status.kind === 'demo' && (
          <p className="flex gap-2 rounded-2xl bg-ivory/10 px-4 py-3 text-[14px] text-ivory">
            <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            Dados validados. Como o formulário está em modo demonstrativo, nenhuma mensagem foi enviada e nenhum agendamento foi realizado.
          </p>
        )}
        {status.kind === 'sent' && (
          <p className="flex gap-2 rounded-2xl bg-sage/20 px-4 py-3 text-[14px] text-ivory">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            Mensagem recebida. A equipe entrará em contato para informações sobre agendamento. Este envio não confirma consulta.
          </p>
        )}
        {status.kind === 'error' && (
          <p className="flex gap-2 rounded-2xl bg-[#7a3b2e]/40 px-4 py-3 text-[14px] text-ivory">
            <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            {status.msg}
          </p>
        )}
      </div>
    </form>
  );
}
