import { Hero } from '@/components/sections/Hero';
import { Welcome } from '@/components/sections/Welcome';
import { Treatments } from '@/components/sections/Treatments';
import { SmileExplorer } from '@/components/sections/SmileExplorer';
import { Journey } from '@/components/sections/Journey';
import { Team } from '@/components/sections/Team';
import { Faq } from '@/components/sections/Faq';
import { Articles } from '@/components/sections/Articles';
import { Contact } from '@/components/sections/Contact';
import { StructuredData } from '@/components/layout/StructuredData';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function Home() {
  useDocumentMeta({
    description:
      'Clínica Odontológica Santa Helena, em São Paulo/SP. Atendimento odontológico preventivo, restaurador e especializado, com escuta e orientação em cada etapa.',
    path: '/',
  });
  return (
    <>
      <StructuredData />
      <Hero />
      <Welcome />
      <Treatments />
      <SmileExplorer />
      <Journey />
      <Team />
      <Faq />
      <Articles />
      <Contact />
    </>
  );
}
