import { forwardRef, useEffect, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '@/lib/gsap';
import { isTouch, prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'light' | 'outlineLight';

const styles: Record<Variant, string> = {
  primary: 'bg-petrol text-ivory hover:bg-deep',
  ghost: 'border border-petrol/25 text-petrol hover:border-petrol bg-transparent',
  light: 'bg-ivory text-deep hover:bg-white',
  outlineLight: 'border border-ivory/40 text-ivory hover:border-ivory',
};

interface Common {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}

function useMagnet<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch() || prefersReducedMotion()) return;
    const label = el.querySelector<HTMLElement>('[data-magnet-label]');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    const lx = label ? gsap.quickTo(label, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' }) : null;
    const ly = label ? gsap.quickTo(label, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' }) : null;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      lx?.(dx * strength * 0.4);
      ly?.(dy * strength * 0.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
      lx?.(0);
      ly?.(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return ref;
}

const base =
  'group relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-display text-[15px] font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:cursor-not-allowed disabled:opacity-60';

function Inner({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span data-magnet-label className="relative z-[1] inline-flex items-center gap-2">
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-organic group-hover:-translate-y-full">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-organic group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon && <span className="transition-transform duration-500 ease-organic group-hover:translate-x-1">{icon}</span>}
    </span>
  );
}

export const MagneticButton = forwardRef<HTMLButtonElement, Common & ButtonHTMLAttributes<HTMLButtonElement>>(function MagneticButton(
  { children, variant = 'primary', className, icon, ...rest },
  _ref,
) {
  const ref = useMagnet<HTMLButtonElement>();
  return (
    <button ref={ref} className={cn(base, styles[variant], className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
});

export function MagneticLink({
  children,
  variant = 'primary',
  className,
  icon,
  to,
  ...rest
}: Common & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const ref = useMagnet<HTMLAnchorElement>();
  const external = /^https?:/.test(to);
  if (external)
    return (
      <a ref={ref} href={to} className={cn(base, styles[variant], className)} target="_blank" rel="noopener noreferrer" {...rest}>
        <Inner icon={icon}>{children}</Inner>
      </a>
    );
  return (
    <Link ref={ref} to={to} className={cn(base, styles[variant], className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}
