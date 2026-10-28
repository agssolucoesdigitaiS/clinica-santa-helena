import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: 'power3.out', duration: 1 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const EASE = {
  organic: 'expo.out',
  soft: 'power3.out',
  inOut: 'power3.inOut',
  elastic: 'elastic.out(1, 0.6)',
};

/** Media queries padrão para gsap.matchMedia() */
export const MQ = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
};

export { gsap, ScrollTrigger, SplitText, useGSAP };
