import { articles } from '@/data/articles';
import { ArticleCard } from '@/components/sections/Articles';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { Reveal } from '@/components/animations/Reveal';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const aspects = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[16/10]', 'aspect-[3/4]'];

export default function ArticlesPage() {
  useDocumentMeta({
    title: 'Conteúdos sobre saúde bucal',
    description: 'Artigos educativos sobre prevenção, higiene bucal, clareamento, ortodontia, odontopediatria, próteses e implantes.',
    path: '/conteudos',
  });
  return (
    <section className="bg-ivory pb-28 pt-32 lg:pt-44" aria-labelledby="ap-title">
      <div className="container-x">
        <Eyebrow>Educação em saúde bucal</Eyebrow>
        <RevealText as="h1" id="ap-title" trigger="mount" className="mt-6 max-w-4xl text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
          Conteúdos para cuidar <em className="serif-accent normal-case text-petrol">melhor.</em>
        </RevealText>
        <p className="mt-6 max-w-xl text-petrol/75">Textos educativos, em linguagem acessível. Não substituem avaliação odontológica individual.</p>
        <div className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-14 [&>*]:break-inside-avoid">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.08}>
              <ArticleCard a={a} aspect={aspects[i]} big={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
