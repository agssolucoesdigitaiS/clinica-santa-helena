import type { ImageId } from './images';

/**
 * ARTIGOS EDUCATIVOS — conteúdo demonstrativo de educação em saúde.
 * Revisar com o responsável técnico antes de publicar.
 */
export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  image: ImageId;
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
}

export const articles: Article[] = [
  {
    slug: 'saude-gengival-sinais-que-merecem-atencao',
    title: 'Saúde gengival: sinais que merecem atenção',
    excerpt: 'Sangramento, inchaço e retração gengival podem indicar alterações que pedem avaliação profissional.',
    category: 'Prevenção',
    readingMinutes: 4,
    image: 'articleGum',
    body: [
      {
        paragraphs: [
          'A gengiva é o tecido que envolve os dentes e participa da proteção das estruturas que os sustentam. Quando a placa bacteriana se acumula na margem gengival, pode ocorrer uma inflamação chamada gengivite.',
          'A gengivite costuma ser silenciosa e pouco dolorosa, por isso vale conhecer os sinais que merecem atenção.',
        ],
      },
      {
        heading: 'Sinais comuns',
        paragraphs: ['Alguns sinais que justificam procurar avaliação odontológica:'],
        list: [
          'Sangramento durante a escovação ou o uso do fio dental.',
          'Gengiva avermelhada, inchada ou sensível.',
          'Mau hálito persistente.',
          'Sensação de dentes mais longos ou com mobilidade.',
        ],
      },
      {
        heading: 'Prevenção',
        paragraphs: [
          'Escovação adequada, higienização entre os dentes e acompanhamento profissional periódico ajudam a manter a saúde gengival. Sem controle, a inflamação pode evoluir e afetar os tecidos de suporte do dente.',
          'Este conteúdo é educativo e não substitui avaliação individual.',
        ],
      },
    ],
  },
  {
    slug: 'como-manter-uma-rotina-de-higiene-bucal',
    title: 'Como manter uma rotina de higiene bucal',
    excerpt: 'Escovação, fio dental e hábitos simples que fazem diferença no dia a dia.',
    category: 'Hábitos',
    readingMinutes: 3,
    image: 'articleRoutine',
    body: [
      {
        paragraphs: [
          'A higiene bucal diária é a base da prevenção. Mais do que a força da escovação, o que importa é a técnica e a regularidade.',
        ],
      },
      {
        heading: 'Pontos de uma boa rotina',
        paragraphs: ['De forma geral, recomenda-se:'],
        list: [
          'Escovar os dentes ao menos duas vezes ao dia, com creme dental fluoretado.',
          'Usar escova de cerdas macias e trocá-la quando as cerdas estiverem desgastadas.',
          'Higienizar entre os dentes com fio dental ou outro recurso indicado pelo dentista.',
          'Reduzir a frequência de consumo de açúcares.',
        ],
      },
      {
        heading: 'Orientação individual',
        paragraphs: [
          'Aparelhos ortodônticos, próteses, implantes e condições gengivais podem exigir recursos específicos. O cirurgião-dentista pode indicar a técnica e os itens mais adequados para cada pessoa.',
        ],
      },
    ],
  },
  {
    slug: 'clareamento-dental-o-que-saber-antes',
    title: 'Clareamento dental: o que saber antes do tratamento',
    excerpt: 'Indicação, sensibilidade e expectativas: o que considerar antes de clarear os dentes.',
    category: 'Estética',
    readingMinutes: 4,
    image: 'articleWhitening',
    body: [
      {
        paragraphs: [
          'O clareamento dental é um procedimento que altera a cor dos dentes por meio de agentes clareadores. Ele deve ser indicado e acompanhado por cirurgião-dentista.',
        ],
      },
      {
        heading: 'Antes de começar',
        paragraphs: ['A avaliação odontológica verifica pontos importantes, como:'],
        list: [
          'Presença de cáries ou problemas gengivais que precisam ser tratados antes.',
          'Restaurações e próteses, que não mudam de cor com o clareamento.',
          'Histórico de sensibilidade dentária.',
        ],
      },
      {
        heading: 'Sensibilidade e resultados',
        paragraphs: [
          'A sensibilidade pode ocorrer durante o tratamento e deve ser comunicada ao profissional. A resposta ao clareamento varia entre as pessoas, e não é possível garantir um resultado específico.',
        ],
      },
    ],
  },
  {
    slug: 'quando-procurar-avaliacao-ortodontica',
    title: 'Quando procurar avaliação ortodôntica?',
    excerpt: 'Dentes desalinhados, dificuldade de mastigação e outros sinais que podem justificar uma avaliação.',
    category: 'Ortodontia',
    readingMinutes: 3,
    image: 'articleOrtho',
    body: [
      {
        paragraphs: [
          'A ortodontia avalia o posicionamento dos dentes e a relação entre as arcadas. Não existe uma idade única para a primeira avaliação: crianças, adolescentes e adultos podem ser avaliados.',
        ],
      },
      {
        heading: 'Situações que merecem avaliação',
        paragraphs: ['Alguns exemplos:'],
        list: [
          'Dentes apinhados, separados ou desalinhados.',
          'Dificuldade para mastigar ou desconforto na mordida.',
          'Dentes superiores e inferiores que não se encontram adequadamente.',
          'Hábitos prolongados na infância, como sucção de dedo ou chupeta.',
        ],
      },
      {
        heading: 'Diagnóstico',
        paragraphs: [
          'O plano é definido após avaliação clínica e, quando indicados, exames complementares. O tipo de aparelho e o tempo de acompanhamento variam conforme o diagnóstico.',
        ],
      },
    ],
  },
  {
    slug: 'importancia-do-acompanhamento-odontologico-infantil',
    title: 'A importância do acompanhamento odontológico infantil',
    excerpt: 'Prevenção desde os primeiros dentes e o papel da família no cuidado.',
    category: 'Infantil',
    readingMinutes: 3,
    image: 'articleKids',
    body: [
      {
        paragraphs: [
          'O acompanhamento odontológico na infância permite orientar a família, prevenir problemas e acompanhar o desenvolvimento da dentição.',
        ],
      },
      {
        heading: 'O papel da família',
        paragraphs: ['Alguns cuidados que costumam ser orientados:'],
        list: [
          'Higiene bucal supervisionada pelos responsáveis, adequada à idade.',
          'Uso de creme dental fluoretado na quantidade indicada pelo profissional.',
          'Atenção à frequência de consumo de açúcares.',
        ],
      },
      {
        heading: 'Uma experiência positiva',
        paragraphs: [
          'Consultas preventivas ajudam a criança a se familiarizar com o ambiente odontológico, o que contribui para uma relação mais tranquila com o cuidado ao longo da vida.',
        ],
      },
    ],
  },
  {
    slug: 'diferenca-entre-proteses-e-implantes',
    title: 'Entenda a diferença entre próteses e implantes dentários',
    excerpt: 'Implante e prótese não são a mesma coisa. Veja como cada um participa da reabilitação.',
    category: 'Reabilitação',
    readingMinutes: 4,
    image: 'articleImplant',
    body: [
      {
        paragraphs: [
          'É comum confundir os termos. De forma simples: o implante é um componente instalado no osso que funciona como suporte; a prótese é a parte que repõe o dente ou os dentes ausentes.',
        ],
      },
      {
        heading: 'Próteses',
        paragraphs: [
          'Podem ser fixas (como coroas e pontes, apoiadas em dentes ou implantes) ou removíveis (parciais ou totais). A escolha depende de quantos dentes estão ausentes, das condições dos dentes remanescentes e de outros fatores clínicos.',
        ],
      },
      {
        heading: 'Implantes',
        paragraphs: [
          'Servem de apoio para uma coroa, ponte ou prótese. A indicação depende de avaliação individual, incluindo condições de saúde e disponibilidade óssea.',
          'Cada alternativa tem indicações, cuidados e limitações. O planejamento é feito em conjunto com o paciente após avaliação.',
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
