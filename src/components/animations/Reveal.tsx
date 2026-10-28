import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';

type Variant = 'up' | 'mask' | 'scale' | 'curtain';

/** Revelação de bloco ao entrar na viewport (variações: up, mask elíptica, scale, cortina). */
export function Reveal({
  children,
  className,
  variant = 'up',
  delay = 0,
  start = 'top 88%',
  stagger = 0.08,
  childSelector,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  start?: string;
  stagger?: number;
  /** anima filhos com stagger em vez do bloco */
  childSelector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = childSelector ? el.querySelectorAll(childSelector) : el;
      const st = { trigger: el, start, once: true };
      if (variant === 'up') gsap.from(targets, { y: 48, autoAlpha: 0, duration: 1.1, ease: 'expo.out', delay, stagger, scrollTrigger: st });
      if (variant === 'scale') gsap.from(targets, { scale: 0.92, autoAlpha: 0, duration: 1.2, ease: 'expo.out', delay, stagger, scrollTrigger: st });
      if (variant === 'mask')
        gsap.fromTo(
          targets,
          { clipPath: 'ellipse(0% 0% at 50% 60%)' },
          { clipPath: 'ellipse(110% 110% at 50% 50%)', duration: 1.6, ease: 'expo.out', delay, stagger, scrollTrigger: st },
        );
      if (variant === 'curtain')
        gsap.fromTo(
          targets,
          { clipPath: 'inset(100% 0% 0% 0% round 32px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, ease: 'expo.out', delay, stagger, scrollTrigger: st },
        );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
