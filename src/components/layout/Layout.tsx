import { Suspense, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '@/lib/gsap';
import { Header } from './Header';
import { Footer } from './Footer';
import { useSmoothScroll } from './SmoothScroll';

function RouteScroll() {
  const { pathname, hash } = useLocation();
  const { scrollTo } = useSmoothScroll();
  useEffect(() => {
    if (hash) {
      const id = window.setTimeout(() => {
        scrollTo(hash, { immediate: false, offset: hash === '#contato' ? 0 : -40 });
      }, 450);
      return () => window.clearTimeout(id);
    }
    scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname, hash, scrollTo]);
  return null;
}

function PageFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-live="polite">
      <span className="font-body text-sm text-petrol/60">Carregando…</span>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <RouteScroll />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>{children}</Suspense>
      </main>
      <Footer />
    </>
  );
}
