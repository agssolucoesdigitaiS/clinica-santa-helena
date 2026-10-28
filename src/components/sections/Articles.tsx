import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles, type Article } from '@/data/articles';
import { DentalImage } from '@/components/ui/DentalImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealText } from '@/components/animations/RevealText';
import { Reveal } from '@/components/animations/Reveal';
import { MagneticLink } from '@/components/animations/MagneticButton';
import { cn } from '@/lib/cn';

export function ArticleCard({ a, aspect, big, className }: { a: Article; aspect: string; big?: boolean; className?: string }) {
  return (
    <Link to={`/conteudos/${a.slug}`} className={cn('group block', className)}>
      <div className={cn('relative overflow-hidden rounded-[28px]', aspect)}>
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-organic group-hover:scale-[1.05]">
          <DentalImage id={a.image} sizes={big ? '(min-width:1024px) 50vw, 92vw' : '(min-width:1024px) 25vw, 92vw'} tagPosition="tl" />
        </div>
        <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-petrol opacity-0 transition-all duration-500 ease-organic group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-sage-ink">
        <span>{a.category}</span>
        <span className="h-px w-6 bg-sage-ink/40" aria-hidden="true" />
        <span>{a.readingMinutes} min de leitura</span>
      </div>
      <h3 className={cn('mt-3 font-display font-medium leading-tight text-deep', big ? 'text-fluid-xl' : 'text-fluid-lg')}>
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-organic group-hover:bg-[length:100%_1.5px]">
          {a.title}
        </span>
      </h3>
      {big && <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-petrol/75">{a.excerpt}</p>}
    </Link>
  );
}

export function Articles() {
  const [a0, a1, a2, a3, a4, a5] = articles;
  return (
    <section id="conteudos" aria-labelledby="articles-title" className="relative bg-white py-24 lg:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow index="07">Conteúdos sobre saúde bucal</Eyebrow>
            <RevealText as="h2" id="articles-title" className="mt-6 max-w-3xl text-fluid-3xl font-medium uppercase leading-[0.95] text-deep">
              Para entender e <em className="serif-accent normal-case text-petrol">prevenir.</em>
            </RevealText>
          </div>
          <MagneticLink to="/conteudos" variant="ghost" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
            Todos os conteúdos
          </MagneticLink>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-12">
          <Reveal variant="curtain" className="md:col-span-7 md:row-span-2">
            <ArticleCard a={a0} aspect="aspect-[4/3] md:aspect-[5/4]" big />
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <ArticleCard a={a1} aspect="aspect-[16/9]" />
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.2}>
            <ArticleCard a={a2} aspect="aspect-[16/9]" />
          </Reveal>
          <Reveal className="md:col-span-4 md:mt-10" delay={0}>
            <ArticleCard a={a3} aspect="aspect-[3/4]" />
          </Reveal>
          <Reveal className="md:col-span-4" delay={0.1}>
            <ArticleCard a={a4} aspect="aspect-square" />
          </Reveal>
          <Reveal className="md:col-span-4 md:mt-24" delay={0.2}>
            <ArticleCard a={a5} aspect="aspect-[4/5]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
