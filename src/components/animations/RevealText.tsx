import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** lines = reveal por linhas com máscara; words = palavras com leve rotação */
  by?: 'lines' | 'words';
  /** scroll = dispara ao entrar na viewport; mount = imediatamente (com delay) */
  trigger?: 'scroll' | 'mount';
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
}

/** Reveal tipográfico por linhas/palavras usando SplitText com máscara. */
export function RevealText({ as: Tag = 'div', children, className, by = 'lines', trigger = 'scroll', delay = 0, stagger, start = 'top 85%', id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.set(el, { autoAlpha: 1 });
      const split = SplitText.create(el, {
        type: by === 'lines' ? 'lines' : 'words',
        mask: by === 'lines' ? 'lines' : undefined,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        autoSplit: true,
        onSplit(self) {
          const targets = by === 'lines' ? self.lines : self.words;
          return gsap.from(targets, {
            yPercent: by === 'lines' ? 110 : 60,
            rotate: by === 'words' ? 4 : 0,
            autoAlpha: by === 'words' ? 0 : 1,
            duration: by === 'lines' ? 1.15 : 0.9,
            ease: 'expo.out',
            stagger: stagger ?? (by === 'lines' ? 0.1 : 0.035),
            delay,
            scrollTrigger: trigger === 'scroll' ? { trigger: el, start, once: true } : undefined,
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <Tag ref={ref} id={id} className={cn('reveal-text', className)}>
      {children}
    </Tag>
  );
}
