import { clinic, isPending } from '@/data/clinic';
import { Pending } from '@/components/ui/Eyebrow';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

/** Modelo de política de privacidade — revisar com assessoria jurídica antes da publicação (LGPD). */
export default function PrivacyPage() {
  useDocumentMeta({ title: 'Política de privacidade', description: 'Como a Clínica Odontológica Santa Helena trata os dados pessoais enviados pelo site.', path: '/privacidade' });
  const s = 'mb-10';
  const h = 'mb-3 font-display text-fluid-lg font-medium text-deep';
  const p = 'mb-3 leading-relaxed text-petrol/85';
  return (
    <section className="bg-ivory pb-24 pt-32 lg:pt-40" aria-labelledby="pp-title">
      <div className="container-x max-w-3xl">
        <p className="mb-6 rounded-2xl border border-dashed border-[#B9875B] bg-white p-4 text-sm text-[#8A5A2E]">
          Modelo de referência. Revisar com assessoria jurídica e adequar às práticas reais da clínica antes da publicação (LGPD — Lei nº 13.709/2018).
        </p>
        <h1 id="pp-title" className="text-fluid-2xl font-medium uppercase leading-[1] text-deep">
          Política de <em className="serif-accent normal-case text-petrol">privacidade</em>
        </h1>
        <div className="mt-12">
          <div className={s}>
            <h2 className={h}>1. Controlador dos dados</h2>
            <p className={p}>
              {clinic.name} — {isPending(clinic.legalName) ? <Pending>Razão social</Pending> : clinic.legalName},{' '}
              {isPending(clinic.cnpj) ? <Pending>CNPJ</Pending> : `CNPJ ${clinic.cnpj}`}. Contato:{' '}
              {isPending(clinic.contact.email) ? <Pending>E-mail para assuntos de privacidade</Pending> : clinic.contact.email}.
            </p>
          </div>
          <div className={s}>
            <h2 className={h}>2. Dados coletados pelo site</h2>
            <p className={p}>
              Pelo formulário de contato: nome, e-mail, número de WhatsApp, tipo de atendimento de interesse, preferência de período e mensagem opcional. O formulário não solicita informações clínicas e
              pedimos que elas não sejam enviadas por esse canal.
            </p>
          </div>
          <div className={s}>
            <h2 className={h}>3. Finalidade</h2>
            <p className={p}>Os dados são utilizados exclusivamente para retornar o contato e fornecer informações sobre atendimentos e agendamentos.</p>
          </div>
          <div className={s}>
            <h2 className={h}>4. Base legal e retenção</h2>
            <p className={p}>O tratamento se baseia no consentimento informado no envio do formulário. Os dados são mantidos pelo período necessário para a finalidade informada. [Definir prazo]</p>
          </div>
          <div className={s}>
            <h2 className={h}>5. Compartilhamento</h2>
            <p className={p}>Os dados não são vendidos. Podem ser processados por fornecedores de tecnologia contratados para a operação do site e do envio de mensagens. [Listar fornecedores]</p>
          </div>
          <div className={s}>
            <h2 className={h}>6. Direitos do titular</h2>
            <p className={p}>Você pode solicitar confirmação, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, além de revogar o consentimento, pelo contato informado acima.</p>
          </div>
          <div className={s}>
            <h2 className={h}>7. Cookies e armazenamento local</h2>
            <p className={p}>Este site não utiliza cookies de rastreamento por padrão. Utiliza apenas armazenamento de sessão para lembrar que a animação de abertura já foi exibida.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
