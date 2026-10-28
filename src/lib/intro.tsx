import { createContext, useContext } from 'react';

/** Indica quando o preloader terminou e a homepage pode iniciar sua animação de entrada. */
export const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);
