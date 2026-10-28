import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { articles, getArticle } from '@/data/articles';
import { ArticleCard } from '@/components/sections/Articles';
import { DentalImage } from '@/components/ui/DentalImage';
import { RevealText } from '@/components/animations/RevealText';
import { Reveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import NotFound from './NotFound';

export default function ArticlePage() {
  const { slug = '' } = useParams();
  const a = getArticle(slug);
  useDocumentMeta({ title: a?.title ?? 'Conteúdo não encontrado', description: a?.excerpt ?? '', path: `/conteudos/${slug}` });
  if (!a) return <NotFound />;
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <article key={slug} className="bg-ivory pt-32 lg:pt-40" aria-labelledby="art-title">
      <header className="container-x max-w-5xl">
        <Link to="/conteudos" className="inline-flex items-center gap-2 text-sm font-semibold text-petrol hover:text-deep">
          <ArrowLeft size={16} aria-hidden="true" /> Todos os conteúdos
        </Link>
        <p className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-sage-ink">
          <span>{a.category}</span>
          <span className="h-px w-6 bg-sage-ink/40" aria-hidden="true" />
          <span>{a.readingMinutes} min de leitura</span>
        </p>
        <RevealText as="h1" id="art-title" trigger="mount" className="mt-5 text-fluid-3xl font-medium leading-[1] text-deep">
          {a.title}
        </RevealText>
        <p className="mt-6 max-w-2xl text-fluid-lg leading-relaxed text-petrol/80">{a.excerpt}</p>
      </header>

      <Reveal variant="mask" className="container-x mt-12 max-w-6xl">
        <Parallax speed={10} scale className="aspect-[16/9] overflow-hidden rounded-[36px]">
          <DentalImage id={a.image} priority sizes="(min-width:1280px) 1200px, 92vw" />
        </Parallax>
      </Reveal>

      <div className="container-x max-w-3xl py-16 lg:py-24">
        {a.body.map((b, i) => (
          <Reveal key={i} className="mb-10">
            {b.heading && <h2 className="mb-4 font-display text-fluid-xl font-medium text-deep">{b.heading}</h2>}
            {b.paragraphs.map((p) => (
              <p key={p} className="mb-4 text-fluid-base leading-[1.75] text-petrol/85">
                {p}
              </p>
            ))}
            {b.list && (
              <ul className="mt-2 space-y-3">
                {b.list.map((li) => (
                  <li key={li} className="flex gap-3 text-fluid-base leading-relaxed text-petrol/85">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-sage-ink" />
                    {li}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
        <aside className="mt-12 rounded-[24px] bg-sage/20 p-6 text-sm leading-relaxed text-petrol">
          <strong className="font-semibold text-deep">Aviso:</strong> conteúdo de caráter educativo, revisado para fins informativos. Não substitui consulta, diagnóstico ou orientação individual de um cirurgião-dentista.
        </aside>
      </div>

      <section className="border-t border-petrol/10 bg-white py-20" aria-labelledby="related-title">
        <div className="container-x">
          <h2 id="related-title" className="font-display text-fluid-xl font-medium text-deep">
            Continue lendo
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {related.map((r, i) => (
              <ArticleCard key={r.slug} a={r} aspect={['aspect-[4/3]', 'aspect-[4/5]', 'aspect-square'][i]} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
