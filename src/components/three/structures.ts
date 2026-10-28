export type StructureId = 'enamel' | 'dentin' | 'pulp' | 'root' | 'support';

export interface Structure {
  id: StructureId;
  label: string;
  text: string;
  /** posição da câmera [x,y,z] e alvo y ao focar */
  camera: [number, number, number];
  targetY: number;
  color: string;
}

export const structures: Structure[] = [
  {
    id: 'enamel',
    label: 'Esmalte',
    text: 'Camada externa da coroa e o tecido mais mineralizado do corpo humano. Não tem células vivas capazes de se regenerar, por isso a prevenção é tão importante.',
    camera: [2.2, 1.6, 4.6],
    targetY: 0.9,
    color: '#F4F1EA',
  },
  {
    id: 'dentin',
    label: 'Dentina',
    text: 'Fica abaixo do esmalte e forma a maior parte do dente. Possui pequenos túbulos, o que ajuda a explicar a sensibilidade quando fica exposta.',
    camera: [-2.6, 0.6, 5.0],
    targetY: 0.2,
    color: '#EBD7B5',
  },
  {
    id: 'pulp',
    label: 'Polpa dentária',
    text: 'Tecido interno com vasos sanguíneos e nervos, localizado na câmara pulpar e nos canais radiculares. Participa da nutrição e da sensibilidade do dente.',
    camera: [0.4, 0.0, 5.0],
    targetY: -0.2,
    color: '#D9877E',
  },
  {
    id: 'root',
    label: 'Raiz',
    text: 'Parte do dente inserida no osso, recoberta por cemento. É por ela que o dente se mantém preso, por meio do ligamento periodontal.',
    camera: [2.6, -1.3, 5.2],
    targetY: -1.4,
    color: '#E2CDB0',
  },
  {
    id: 'support',
    label: 'Estruturas de suporte',
    text: 'Gengiva, ligamento periodontal, cemento e osso alveolar formam o periodonto, conjunto que protege e sustenta o dente. Aqui representados de forma esquemática.',
    camera: [-3.4, -0.6, 6.6],
    targetY: -0.9,
    color: '#A6BDB5',
  },
];

export const OVERVIEW = { camera: [0, 0.4, 9.2] as [number, number, number], targetY: -0.65 };
