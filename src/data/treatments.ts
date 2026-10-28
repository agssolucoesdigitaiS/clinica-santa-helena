import type { ImageId } from './images';

/**
 * CATÁLOGO DEMONSTRATIVO DE TRATAMENTOS
 * Confirmar antes da publicação: serviços efetivamente prestados,
 * profissionais habilitados e escopo de atuação de cada um.
 * Para ocultar um tratamento, defina `active: false`.
 */
export interface Treatment {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  image: ImageId;
  /** Tom de fundo do painel interativo */
  tint: string;
  active: boolean;
  page: {
    intro: string;
    sections: { heading: string; body: string }[];
    steps: string[];
  };
}

export const treatments: Treatment[] = [
  {
    slug: 'clinica-geral-e-prevencao',
    number: '01',
    title: 'Clínica Geral e Prevenção',
    short: 'Avaliação, orientação e acompanhamento preventivo.',
    description:
      'Avaliações odontológicas, orientações de higiene bucal, acompanhamento preventivo e procedimentos clínicos conforme necessidade individual.',
    image: 'heroConsult',
    tint: '#EEF2EF',
    active: true,
    page: {
      intro:
        'A clínica geral é o ponto de partida do cuidado odontológico. É nela que se conhece o histórico do paciente, se avaliam as condições bucais e se definem, junto com ele, os próximos passos.',
      sections: [
        {
          heading: 'O que envolve',
          body: 'Entrevista sobre histórico de saúde, exame clínico, orientações de higiene e, quando necessário, solicitação de exames complementares ou encaminhamento para outras áreas da odontologia.',
        },
        {
          heading: 'Por que a prevenção importa',
          body: 'O acompanhamento periódico permite identificar alterações em fases iniciais e orientar hábitos que contribuem para a saúde bucal. A periodicidade das consultas é definida individualmente.',
        },
      ],
      steps: ['Conversa sobre histórico e queixas', 'Exame clínico', 'Orientações personalizadas', 'Definição do acompanhamento'],
    },
  },
  {
    slug: 'limpeza-e-saude-gengival',
    number: '02',
    title: 'Limpeza e Saúde Gengival',
    short: 'Remoção profissional de depósitos e avaliação gengival.',
    description:
      'Orientação preventiva, remoção profissional de depósitos dentários quando indicada e avaliação das condições gengivais.',
    image: 'hygiene',
    tint: '#E9EFEC',
    active: true,
    page: {
      intro:
        'A gengiva participa da sustentação dos dentes. Avaliar suas condições e remover depósitos que a escovação não alcança faz parte do cuidado preventivo.',
      sections: [
        {
          heading: 'O que envolve',
          body: 'Avaliação das condições gengivais, remoção profissional de placa e cálculo dentário quando indicada, polimento e orientação sobre técnicas de escovação e higienização entre os dentes.',
        },
        {
          heading: 'Sinais que merecem atenção',
          body: 'Sangramento ao escovar, gengiva avermelhada ou inchada, mau hálito persistente e sensação de dentes mais longos são sinais que justificam uma avaliação profissional.',
        },
      ],
      steps: ['Avaliação gengival', 'Remoção de depósitos, quando indicada', 'Orientação de higiene', 'Acompanhamento'],
    },
  },
  {
    slug: 'clareamento-dental',
    number: '03',
    title: 'Clareamento Dental',
    short: 'Avaliação da indicação e acompanhamento profissional.',
    description:
      'Avaliação da indicação de técnicas de clareamento e acompanhamento profissional, considerando as condições bucais e possíveis sensibilidades.',
    image: 'whitening',
    tint: '#F3EEE8',
    active: true,
    page: {
      intro:
        'O clareamento dental é um procedimento que deve ser indicado e acompanhado por cirurgião-dentista. A avaliação prévia verifica se há condições bucais que precisam ser tratadas antes.',
      sections: [
        {
          heading: 'Avaliação antes de tudo',
          body: 'Cáries, problemas gengivais, restaurações e sensibilidade são considerados na indicação. Restaurações e próteses não mudam de cor com o clareamento, o que também entra no planejamento.',
        },
        {
          heading: 'Expectativas realistas',
          body: 'A resposta ao clareamento varia de pessoa para pessoa. A sensibilidade durante o tratamento pode ocorrer e deve ser comunicada ao profissional.',
        },
      ],
      steps: ['Avaliação clínica', 'Indicação da técnica', 'Acompanhamento das sessões', 'Orientações de manutenção'],
    },
  },
  {
    slug: 'ortodontia',
    number: '04',
    title: 'Ortodontia',
    short: 'Posicionamento dentário e oclusão.',
    description:
      'Avaliação e acompanhamento das alterações de posicionamento dentário e da oclusão, com recursos indicados conforme o diagnóstico.',
    image: 'orthodontics',
    tint: '#E6ECEA',
    active: true,
    page: {
      intro:
        'A ortodontia cuida do posicionamento dos dentes e da relação entre as arcadas (oclusão). O recurso utilizado depende do diagnóstico realizado com base em avaliação e exames.',
      sections: [
        {
          heading: 'Como é feita a avaliação',
          body: 'Exame clínico e, conforme a necessidade, exames complementares como radiografias, fotografias e modelos. A partir deles, o profissional explica as alternativas e o tempo estimado de acompanhamento.',
        },
        {
          heading: 'Aparelhos',
          body: 'Existem diferentes tipos de aparelhos, fixos e removíveis. A escolha considera o diagnóstico, a idade e as necessidades de cada paciente.',
        },
      ],
      steps: ['Avaliação ortodôntica', 'Exames complementares', 'Plano e alternativas', 'Consultas de manutenção'],
    },
  },
  {
    slug: 'implantes-dentarios',
    number: '05',
    title: 'Implantes Dentários',
    short: 'Planejamento de reabilitação de ausências dentárias.',
    description:
      'Planejamento de reabilitação de ausências dentárias por meio de implantes, conforme avaliação clínica, exames e condições individuais.',
    image: 'implant',
    tint: '#ECEAE4',
    active: true,
    page: {
      intro:
        'O implante dentário é uma das alternativas para repor dentes ausentes. A indicação depende de uma avaliação individual que inclui condições de saúde geral, disponibilidade óssea e planejamento reabilitador.',
      sections: [
        {
          heading: 'Planejamento',
          body: 'Exames de imagem e avaliação clínica permitem verificar a viabilidade, a necessidade de procedimentos complementares e a melhor forma de reabilitação.',
        },
        {
          heading: 'Etapas',
          body: 'Em geral, há uma etapa cirúrgica de instalação do implante e uma etapa protética para a confecção da coroa. Prazos e etapas variam conforme cada caso.',
        },
      ],
      steps: ['Avaliação e exames', 'Planejamento', 'Etapa cirúrgica', 'Etapa protética e acompanhamento'],
    },
  },
  {
    slug: 'tratamento-de-canal',
    number: '06',
    title: 'Tratamento de Canal',
    short: 'Endodontia para alterações da polpa dentária.',
    description:
      'Avaliação e tratamento endodôntico de dentes com alterações pulpares, quando clinicamente indicado.',
    image: 'endodontic',
    tint: '#EFEBE6',
    active: true,
    page: {
      intro:
        'A polpa é o tecido interno do dente, com vasos e nervos. Quando ela sofre alterações, o tratamento endodôntico pode ser indicado para preservar o dente.',
      sections: [
        {
          heading: 'O que é',
          body: 'O tratamento envolve acesso ao interior do dente, limpeza e modelagem dos canais radiculares e seu preenchimento. Depois, o dente geralmente precisa de restauração adequada.',
        },
        {
          heading: 'Quando avaliar',
          body: 'Dor espontânea, sensibilidade prolongada ao calor ou ao frio, escurecimento do dente ou inchaço na região são situações que merecem avaliação.',
        },
      ],
      steps: ['Avaliação clínica e radiográfica', 'Tratamento dos canais', 'Restauração do dente', 'Controle'],
    },
  },
  {
    slug: 'protese-dentaria',
    number: '07',
    title: 'Prótese Dentária',
    short: 'Reabilitação funcional e estética.',
    description:
      'Planejamento de alternativas protéticas para reabilitação funcional e estética, segundo a necessidade do paciente.',
    image: 'prosthesis',
    tint: '#ECE6DF',
    active: true,
    page: {
      intro:
        'Próteses dentárias repõem dentes ausentes ou estruturas perdidas. Podem ser fixas, removíveis ou apoiadas sobre implantes, conforme o planejamento.',
      sections: [
        {
          heading: 'Tipos de prótese',
          body: 'Coroas, pontes fixas, próteses parciais removíveis e próteses totais são algumas alternativas. Cada uma tem indicações, cuidados e limitações próprias.',
        },
        {
          heading: 'Trabalho conjunto',
          body: 'A confecção envolve o cirurgião-dentista e o laboratório de prótese, com etapas de moldagem ou escaneamento, provas e ajustes.',
        },
      ],
      steps: ['Avaliação e planejamento', 'Preparo e moldagem', 'Provas e ajustes', 'Instalação e orientações'],
    },
  },
  {
    slug: 'odontopediatria',
    number: '08',
    title: 'Odontopediatria',
    short: 'Prevenção e orientação para crianças e famílias.',
    description:
      'Atendimento odontológico infantil, com foco em prevenção, acompanhamento do desenvolvimento bucal e orientação à família.',
    image: 'pediatric',
    tint: '#EEF0EA',
    active: true,
    page: {
      intro:
        'A odontopediatria acompanha a saúde bucal desde os primeiros dentes. Além do cuidado com a criança, orienta a família sobre higiene, alimentação e hábitos.',
      sections: [
        {
          heading: 'Acolhimento',
          body: 'O atendimento infantil respeita o tempo da criança, com linguagem adequada à idade e participação do responsável.',
        },
        {
          heading: 'Prevenção',
          body: 'Orientações de escovação, uso de flúor conforme indicação profissional e acompanhamento da troca dos dentes fazem parte do cuidado.',
        },
      ],
      steps: ['Ambientação e conversa', 'Avaliação', 'Orientação à família', 'Acompanhamento periódico'],
    },
  },
];

export const activeTreatments = treatments.filter((t) => t.active);
export const getTreatment = (slug: string) => activeTreatments.find((t) => t.slug === slug);
