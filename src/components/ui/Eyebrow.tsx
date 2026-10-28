import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export function Eyebrow({ children, className, light, index }: { children: ReactNode; className?: string; light?: boolean; index?: string }) {
  return (
    <p className={cn('flex items-center gap-3 font-body text-fluid-xs font-semibold uppercase tracking-[0.2em]', light ? 'text-sage-soft' : 'text-sage-ink', className)}>
      {index && <span className={cn('font-serif text-base normal-case tracking-normal', light ? 'text-ivory/70' : 'text-petrol')}>{index}</span>}
      <span aria-hidden="true" className={cn('h-px w-8', light ? 'bg-sage-soft/60' : 'bg-sage-ink/50')} />
      {children}
    </p>
  );
}

/** Indicador visual de dado pendente de configuração. */
export function Pending({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-0.5 font-body text-[12px] font-semibold',
        light ? 'border-sand/60 text-sand' : 'border-[#B9875B] text-[#8A5A2E]',
      )}
    >
      <span aria-hidden="true">●</span>
      {children}
    </span>
  );
}
