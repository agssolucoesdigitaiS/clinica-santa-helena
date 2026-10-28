import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';

type ScrollTarget = string | number | HTMLElement;
interface Ctx {
  scrollTo: (target: ScrollTarget, opts?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
}

const SmoothCtx = createContext<Ctx>({ scrollTo: () => {}, stop: () => {}, start: () => {} });
export const useSmoothScroll = () => useContext(SmoothCtx);

/** Lenis sincronizado ao ticker do GSAP/ScrollTrigger. Desativado com prefers-reduced-motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, touchMultiplier: 1.4 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<Ctx['scrollTo']>((target, opts = {}) => {
    const offset = opts.offset ?? -80;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, immediate: opts.immediate, duration: 1.4 });
      return;
    }
    let y = 0;
    if (typeof target === 'number') y = target;
    else {
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;
      y = el.getBoundingClientRect().top + window.scrollY + offset;
    }
    window.scrollTo({ top: y, behavior: opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return <SmoothCtx.Provider value={{ scrollTo, stop, start }}>{children}</SmoothCtx.Provider>;
}
