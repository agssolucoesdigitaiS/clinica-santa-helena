import { cn } from '@/lib/cn';

/** Símbolo: um contorno contínuo de dente, desenhado como uma única linha orgânica. */
export const LOGO_PATH =
  'M11.2 6.5c-3.6 0-5.2 3.1-4.4 6.8.7 3.4 1.6 9.4 3.4 11.6 1.3 1.5 2.2-3.7 3.4-5.6.9-1.4 2.9-1.4 3.8 0 1.2 1.9 2.1 7.1 3.4 5.6 1.8-2.2 2.7-8.2 3.4-11.6.8-3.7-.8-6.8-4.4-6.8-2.2 0-3 1.2-4.3 1.2s-2.1-1.2-4.3-1.2Z';

export function LogoMark({ className, stroke = 'currentColor' }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path d={LOGO_PATH} stroke={stroke} strokeWidth={1.7} strokeLinejoin="round" strokeLinecap="round" />
      <path d="M12.5 11.2c1.1.8 2.3 1.2 3.5 1.2s2.4-.4 3.5-1.2" stroke={stroke} strokeWidth={1.3} strokeLinecap="round" opacity={0.6} />
    </svg>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', light ? 'text-ivory' : 'text-petrol', className)}>
      <span className={cn('grid h-10 w-10 place-items-center rounded-full', light ? 'bg-ivory/10' : 'bg-sage/30')}>
        <LogoMark className="h-7 w-7" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-tight">Santa Helena</span>
        <span className={cn('mt-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em]', light ? 'text-ivory/60' : 'text-sage-ink')}>
          Clínica Odontológica
        </span>
      </span>
    </span>
  );
}
