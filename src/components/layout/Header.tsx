import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarHeart, X } from 'lucide-react';
import { navLinks } from '@/data/content';
import { clinic, whatsappLink } from '@/data/clinic';
import { Logo } from '@/components/ui/Logo';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/env';
import { cn } from '@/lib/cn';
import { useSmoothScroll } from './SmoothScroll';

export function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  return (hash: string) => {
    if (pathname === '/') scrollTo(hash === 'inicio' ? 0 : `#${hash}`, { offset: hash === 'contato' ? 0 : -40 });
    else navigate(`/#${hash}`);
  };
}

export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const { pathname } = useLocation();
  const go = useSectionNav();
  const { stop, start } = useSmoothScroll();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  // header compacto + barra de progresso
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setCompact(self.scroll() > 40);
        if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, [pathname]);

  // seção ativa (somente na home)
  useEffect(() => {
    if (pathname !== '/') return;
    const triggers: ScrollTrigger[] = [];
    const id = window.setTimeout(() => {
      navLinks.forEach(({ hash }) => {
        const el = document.getElementById(hash);
        if (!el) return;
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top 45%',
            end: 'bottom 45%',
            onToggle: (self) => self.isActive && setActive(hash),
          }),
        );
      });
    }, 300);
    return () => {
      window.clearTimeout(id);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  // menu mobile: expansão orgânica a partir do botão
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const btn = menuBtn.current?.getBoundingClientRect();
    const origin = btn ? `${btn.left + btn.width / 2}px ${btn.top + btn.height / 2}px` : '90% 5%';
    if (open) {
      stop();
      document.documentElement.style.overflow = 'hidden';
      gsap.set(el, { visibility: 'visible' });
      const tl = gsap.timeline();
      tl.fromTo(el, { clipPath: `circle(0% at ${origin})` }, { clipPath: `circle(150% at ${origin})`, duration: reduce ? 0 : 0.9, ease: 'expo.inOut' }).fromTo(
        el.querySelectorAll('[data-m-item]'),
        { yPercent: 120, rotate: 3 },
        { yPercent: 0, rotate: 0, duration: reduce ? 0 : 0.9, stagger: 0.05, ease: 'expo.out' },
        '-=0.45',
      );
      el.querySelector<HTMLElement>('a,button')?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
        if (e.key === 'Tab') {
          const f = Array.from(el.querySelectorAll<HTMLElement>('a,button')).filter((n) => !n.hasAttribute('disabled'));
          if (!f.length) return;
          const first = f[0];
          const last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
    if (el.style.visibility === 'visible') {
      gsap.to(el, {
        clipPath: `circle(0% at ${origin})`,
        duration: reduce ? 0 : 0.7,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(el, { visibility: 'hidden' });
        },
      });
      document.documentElement.style.overflow = '';
      start();
      menuBtn.current?.focus();
    }
  }, [open, stop, start]);

  useEffect(() => setOpen(false), [pathname]);

  const onNav = (hash: string) => {
    if (open) {
      setOpen(false);
      // aguarda o menu liberar o scroll (Lenis) antes de navegar
      window.setTimeout(() => go(hash), 120);
    } else go(hash);
  };
  const wa = whatsappLink();

  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-petrol px-4 py-2 text-sm font-semibold text-ivory transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className={cn('container-x transition-[padding] duration-500 ease-organic', compact ? 'pt-3' : 'pt-4 lg:pt-6')}>
          <div
            className={cn(
              'pointer-events-auto relative flex items-center justify-between gap-4 overflow-hidden rounded-full border border-white/70 bg-white/80 pl-3 pr-2 shadow-float backdrop-blur-xl transition-all duration-500 ease-organic',
              compact ? 'py-1.5' : 'py-2',
            )}
          >
            <Link to="/" aria-label={`${clinic.name} — página inicial`} className="rounded-full" onClick={() => pathname === '/' && go('inicio')}>
              <Logo />
            </Link>
            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((l) => {
                  const isActive = pathname === '/' && active === l.hash;
                  return (
                    <li key={l.hash}>
                      <a
                        href={`/#${l.hash}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNav(l.hash);
                        }}
                        aria-current={isActive ? 'location' : undefined}
                        className={cn(
                          'relative rounded-full px-4 py-2 font-display text-[15px] font-medium transition-colors duration-300',
                          isActive ? 'text-deep' : 'text-petrol/70 hover:text-deep',
                        )}
                      >
                        {isActive && <span aria-hidden="true" className="absolute inset-0 -z-[1] rounded-full bg-sage/30" />}
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <MagneticButton onClick={() => onNav('contato')} className="hidden !min-h-[44px] !px-5 sm:inline-flex" icon={<CalendarHeart size={16} aria-hidden="true" />}>
                Agendar
              </MagneticButton>
              <button
                ref={menuBtn}
                type="button"
                className="relative grid h-11 w-11 place-items-center rounded-full bg-petrol text-ivory lg:hidden"
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                onClick={() => setOpen((v) => !v)}
              >
                <span aria-hidden="true" className="flex flex-col gap-[5px]">
                  <span className="block h-[1.5px] w-5 bg-current" />
                  <span className="block h-[1.5px] w-3.5 self-end bg-current" />
                </span>
              </button>
            </div>
            <span ref={progress} aria-hidden="true" className="absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-sage" />
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        ref={panel}
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="invisible fixed inset-0 z-[60] flex flex-col bg-deep text-ivory lg:hidden"
        style={{ clipPath: 'circle(0% at 90% 5%)' }}
      >
        <div className="container-x flex items-center justify-between pt-5">
          <Logo light />
          <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-ivory/10" aria-label="Fechar menu">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Navegação mobile" className="container-x mt-10 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navLinks.map((l, i) => (
              <li key={l.hash} className="overflow-hidden">
                <a
                  data-m-item
                  href={`/#${l.hash}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNav(l.hash);
                  }}
                  className="flex items-baseline gap-4 py-2 font-display text-[clamp(2.2rem,10vw,3.4rem)] font-medium leading-none tracking-tight"
                >
                  <span className="font-serif text-base italic text-sage">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x pb-8 pt-6">
          <div className="overflow-hidden">
            <div data-m-item className="flex flex-col gap-3">
              <button type="button" onClick={() => onNav('contato')} className="min-h-[52px] rounded-full bg-sage px-6 font-display font-medium text-deep">
                Agendar uma conversa
              </button>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-center rounded-full border border-ivory/30 px-6 font-display">
                  WhatsApp
                </a>
              ) : (
                <p className="text-center text-xs text-ivory/50">WhatsApp oficial: a configurar</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
