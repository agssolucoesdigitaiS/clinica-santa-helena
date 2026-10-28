import { lazy, useCallback, useState } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Layout } from '@/components/layout/Layout';
import { Preloader } from '@/components/layout/Preloader';
import { IntroContext } from '@/lib/intro';
import { safeStorage } from '@/lib/env';
import { ScrollTrigger } from '@/lib/gsap';
import Home from '@/pages/Home';

const TreatmentPage = lazy(() => import('@/pages/TreatmentPage'));
const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'));
const ArticlePage = lazy(() => import('@/pages/ArticlePage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Prévia hospedada (arquivo único) usa HashRouter; produção usa BrowserRouter.
// Desligue o preloader com VITE_PRELOADER=off (melhora o LCP da primeira visita).
const PRELOADER_ENABLED = import.meta.env.VITE_PRELOADER !== 'off';

const Router = import.meta.env.MODE === 'preview' ? HashRouter : BrowserRouter;

export default function App() {
  const [showPreloader] = useState(() => PRELOADER_ENABLED && !safeStorage.get('sh-intro'));
  const [ready, setReady] = useState(!showPreloader);
  const [preloaderMounted, setPreloaderMounted] = useState(showPreloader);

  const onReveal = useCallback(() => {
    safeStorage.set('sh-intro', '1');
    setReady(true);
  }, []);
  const onDone = useCallback(() => {
    setPreloaderMounted(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SmoothScroll>
        <IntroContext.Provider value={ready}>
          {preloaderMounted && <Preloader onDone={onDone} onReveal={onReveal} />}
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tratamentos/:slug" element={<TreatmentPage />} />
              <Route path="/conteudos" element={<ArticlesPage />} />
              <Route path="/conteudos/:slug" element={<ArticlePage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </IntroContext.Provider>
      </SmoothScroll>
    </Router>
  );
}
