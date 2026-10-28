import { MagneticLink } from '@/components/animations/MagneticButton';
import { LogoMark } from '@/components/ui/Logo';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta({ title: 'Página não encontrada', description: 'A página procurada não foi encontrada.', path: '/404' });
  return (
    <section className="container-x grid min-h-[80vh] place-items-center pt-28 text-center">
      <div>
        <LogoMark className="mx-auto h-16 w-16 text-sage" />
        <h1 className="mt-6 text-fluid-3xl font-medium uppercase text-deep">
          Página não <em className="serif-accent normal-case text-petrol">encontrada.</em>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-petrol/75">O endereço pode ter mudado. Volte para a página inicial para continuar navegando.</p>
        <div className="mt-8">
          <MagneticLink to="/">Voltar ao início</MagneticLink>
        </div>
      </div>
    </section>
  );
}
