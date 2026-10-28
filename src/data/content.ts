import type { ImageId } from './images';
import type { Pending } from './clinic';

/* ---------------------------------------------------------------
 * EQUIPE — PERFIS ILUSTRATIVOS
 * Os nomes abaixo são FICTÍCIOS e servem apenas como placeholder visual.
 * Substitua por profissionais reais, com CRO e especialidades registradas
 * verificados no conselho, e então defina `illustrative: false`.
 * ------------------------------------------------------------- */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: ImageId;
  /** Número de inscrição no CRO — preencher com dado real */
  cro: Pending<string>;
  /** Especialidades registradas no CFO — preencher somente se verificadas */
  registeredSpecialties: Pending<string[]>;
  illustrative: boolean;
}

export const team: TeamMember[] = [
  {
    name: 'Dra. Helena Martins',
    role: 'Perfil demonstrativo · clínica geral',
    bio: 'Perfil ilustrativo para apresentar o atendimento de clínica geral: avaliação, prevenção e orientação de cada paciente.',
    image: 'teamA',
    cro: null,
    registeredSpecialties: null,
    illustrative: true,
  },
  {
    name: 'Dr. Ricardo Vasconcelos',
    role: 'Perfil demonstrativo · reabilitação oral',
    bio: 'Perfil ilustrativo para apresentar a atuação em reabilitação oral, com planejamento de próteses e implantes.',
    image: 'teamB',
    cro: null,
    registeredSpecialties: null,
    illustrative: true,
  },
  {
    name: 'Dra. Camila Ferreira',
    role: 'Perfil demonstrativo · odontopediatria',
    bio: 'Perfil ilustrativo para apresentar o atendimento infantil, com foco em prevenção e orientação às famílias.',
    image: 'teamC',
    cro: null,
    registeredSpecialties: null,
    illustrative: true,
  },
];

/* --------------------------- FAQ --------------------------- */
export const faq: { q: string; a: string }[] = [
  {
    q: 'Com que frequência devo consultar um dentista?',
    a: 'A periodicidade deve ser individualizada. O profissional pode recomendar intervalos diferentes conforme as condições de saúde bucal e fatores de risco.',
  },
  {
    q: 'A limpeza profissional substitui a escovação?',
    a: 'Não. A limpeza profissional complementa os cuidados diários, que incluem escovação adequada e higienização entre os dentes.',
  },
  {
    q: 'O clareamento dental é indicado para todas as pessoas?',
    a: 'Não necessariamente. A indicação depende de avaliação odontológica e de fatores como sensibilidade, restaurações e condições bucais.',
  },
  {
    q: 'Implantes dentários podem ser indicados para qualquer paciente?',
    a: 'A indicação depende de uma avaliação individual, incluindo condições de saúde, disponibilidade óssea e planejamento reabilitador.',
  },
  {
    q: 'Crianças precisam de acompanhamento odontológico?',
    a: 'Sim. O acompanhamento permite orientar a família, promover prevenção e avaliar o desenvolvimento da saúde bucal.',
  },
  {
    q: 'Como funciona a primeira consulta?',
    a: 'Em geral, envolve entrevista sobre histórico de saúde, avaliação clínica e esclarecimento de dúvidas. Etapas adicionais dependem da situação.',
  },
];

/* ------------------------- JORNADA ------------------------- */
export const journey: { n: string; title: string; text: string; image: ImageId }[] = [
  { n: '01', title: 'Conversa inicial', text: 'O paciente apresenta suas necessidades, dúvidas e expectativas.', image: 'journey1' },
  {
    n: '02',
    title: 'Avaliação clínica',
    text: 'O cirurgião-dentista realiza a avaliação e identifica a necessidade de exames complementares, quando indicados.',
    image: 'journey2',
  },
  {
    n: '03',
    title: 'Planejamento',
    text: 'As possibilidades de tratamento são explicadas, incluindo etapas, riscos, benefícios e alternativas pertinentes.',
    image: 'journey3',
  },
  {
    n: '04',
    title: 'Acompanhamento',
    text: 'O paciente recebe orientações e acompanhamento conforme o tratamento e suas necessidades clínicas.',
    image: 'journey4',
  },
];

/* ----------------------- REDES / NAV ----------------------- */
export const navLinks = [
  { label: 'Início', hash: 'inicio' },
  { label: 'Clínica', hash: 'clinica' },
  { label: 'Tratamentos', hash: 'tratamentos' },
  { label: 'Equipe', hash: 'equipe' },
  { label: 'Dúvidas', hash: 'duvidas' },
  { label: 'Contato', hash: 'contato' },
];
