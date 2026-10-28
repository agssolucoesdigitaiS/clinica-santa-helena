import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';

/** Parallax vertical leve controlado por scrub. speed: % de deslocamento (positivo = mais lento). */
export function Parallax({ children, speed = 12, className, scale = false }: { children: ReactNode; speed?: number; className?: string; scale?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      const inner = ref.current.firstElementChild as HTMLElement | null;
      if (!inner) return;
      gsap.fromTo(
        inner,
        { yPercent: -speed / 2, scale: scale ? 1.12 : 1 },
        { yPercent: speed / 2, scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <div className="h-full w-full will-change-transform">{children}</div>
    </div>
  );
}
