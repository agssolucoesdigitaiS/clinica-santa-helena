/**
 * REGISTRO DE FOTOGRAFIAS
 * ---------------------------------------------------------------
 * Nenhuma fotografia real foi incluída neste projeto. Cada entrada abaixo
 * renderiza uma ILUSTRAÇÃO-PLACEHOLDER temática, identificada na tela como
 * "Placeholder". Para substituir:
 *   1. Coloque os arquivos em /public/assets/images/<id>-<largura>.avif|webp|jpg
 *      (larguras sugeridas: 640, 1024, 1600, 2200).
 *   2. Preencha `photo` na entrada correspondente (ex.: photo: { base: '/assets/images/hero', widths: [640,1024,1600,2200], width: 2200, height: 1400 }).
 *   3. Registre licença/autorização em `license` e no CHECKLIST-PRE-PUBLICACAO.md.
 * O componente <DentalImage> gera <picture> com AVIF, WebP, srcset e sizes automaticamente.
 */

export type SceneKey =
  | 'reception'
  | 'consultation'
  | 'operatory'
  | 'evaluation'
  | 'orthodontics'
  | 'implant'
  | 'pediatric'
  | 'restorative'
  | 'portraitA'
  | 'portraitB'
  | 'portraitC'
  | 'closing'
  | 'hygiene'
  | 'whitening'
  | 'endodontic'
  | 'prosthesis'
  | 'gumHealth'
  | 'routine'
  | 'shadeGuide'
  | 'archModel'
  | 'kidsBrush'
  | 'implantVsProsthesis'
  | 'firstVisit'
  | 'planning'
  | 'followUp'
  | 'welcomeConsult';

export interface PhotoSource {
  base: string;
  widths: number[];
  width: number;
  height: number;
}

export interface ImageAsset {
  id: string;
  /** Rótulo do briefing (ex.: "Imagem 03 — Consultório") */
  brief: string;
  /** Texto alternativo descritivo */
  alt: string;
  scene: SceneKey;
  /** Preencher ao receber fotografia licenciada */
  photo?: PhotoSource;
  license?: string;
}

const img = (id: string, brief: string, scene: SceneKey, alt: string): ImageAsset => ({ id, brief, scene, alt });

export const images = {
  hero: img('hero', 'Imagem 01 — Recepção (hero)', 'reception', 'Recepção de clínica odontológica com balcão orgânico em pedra clara, madeira natural e detalhes em verde sálvia.'),
  heroConsult: img('hero-consult', 'Imagem 02 — Atendimento humanizado', 'consultation', 'Cirurgiã-dentista conversa com paciente adulta em consultório odontológico moderno.'),
  welcomeReception: img('welcome-reception', 'Galeria — Recepção odontológica', 'reception', 'Detalhe da recepção da clínica com luz difusa e mobiliário em madeira.'),
  welcomeRoom: img('welcome-room', 'Imagem 03 — Consultório', 'operatory', 'Sala odontológica com cadeira profissional, refletor, mocho, unidade auxiliar e bancada clínica.'),
  welcomeConsult: img('welcome-consult', 'Galeria — Profissional e paciente', 'welcomeConsult', 'Profissional explica orientações a uma paciente sentada, em ambiente clínico acolhedor.'),
  evaluation: img('evaluation', 'Imagem 04 — Avaliação odontológica', 'evaluation', 'Dentista e paciente observam informações do atendimento em um monitor.'),
  orthodontics: img('orthodontics', 'Imagem 05 — Ortodontia', 'orthodontics', 'Sorriso adulto natural com aparelho ortodôntico fixo convencional.'),
  implant: img('implant', 'Imagem 06 — Implantodontia', 'implant', 'Modelo anatômico de implante dentário com coroa, componente de conexão e osso representados.'),
  pediatric: img('pediatric', 'Imagem 07 — Odontopediatria', 'pediatric', 'Criança acompanhada da responsável conversa com a dentista em consultório acolhedor.'),
  restorative: img('restorative', 'Imagem 08 — Dentística restauradora', 'restorative', 'Bancada clínica com materiais odontológicos organizados antes do atendimento.'),
  hygiene: img('hygiene', 'Tratamento — Limpeza e saúde gengival', 'hygiene', 'Instrumentais de higiene profissional organizados em bandeja, sem procedimento em execução.'),
  whitening: img('whitening', 'Tratamento — Clareamento', 'whitening', 'Sorriso adulto natural sob iluminação suave, sem simulação de resultado.'),
  endodontic: img('endodontic', 'Tratamento — Canal', 'endodontic', 'Modelo anatômico em corte mostrando esmalte, dentina, polpa e canais radiculares.'),
  prosthesis: img('prosthesis', 'Tratamento — Prótese', 'prosthesis', 'Modelo de arcada com prótese dentária sobre bancada de laboratório odontológico.'),
  teamA: img('team-a', 'Imagem 09 — Retrato ilustrativo A', 'portraitA', 'Retrato ilustrativo de cirurgiã-dentista de jaleco em ambiente clínico.'),
  teamB: img('team-b', 'Imagem 09 — Retrato ilustrativo B', 'portraitB', 'Retrato ilustrativo de cirurgião-dentista de jaleco em ambiente clínico.'),
  teamC: img('team-c', 'Imagem 09 — Retrato ilustrativo C', 'portraitC', 'Retrato ilustrativo de cirurgiã-dentista de jaleco em ambiente clínico.'),
  closing: img('closing', 'Imagem 10 — Encerramento', 'closing', 'Adulto sorrindo naturalmente em ambiente neutro com luz suave.'),
  journey1: img('journey-1', 'Jornada — Conversa inicial', 'firstVisit', 'Paciente e profissional conversam sentados frente a frente.'),
  journey2: img('journey-2', 'Jornada — Avaliação clínica', 'operatory', 'Consultório preparado para avaliação clínica.'),
  journey3: img('journey-3', 'Jornada — Planejamento', 'planning', 'Profissional apresenta etapas do plano de tratamento com um modelo odontológico.'),
  journey4: img('journey-4', 'Jornada — Acompanhamento', 'followUp', 'Calendário de retornos e kit de higiene bucal sobre a mesa.'),
  articleGum: img('article-gum', 'Artigo — Saúde gengival', 'gumHealth', 'Ilustração de dentes e gengiva saudáveis.'),
  articleRoutine: img('article-routine', 'Artigo — Rotina de higiene', 'routine', 'Escova, fio dental e copo sobre uma pia clara.'),
  articleWhitening: img('article-whitening', 'Artigo — Clareamento', 'shadeGuide', 'Escala de cores dentárias usada em avaliação odontológica.'),
  articleOrtho: img('article-ortho', 'Artigo — Avaliação ortodôntica', 'archModel', 'Modelo de arcada dentária visto de cima com aparelho ortodôntico.'),
  articleKids: img('article-kids', 'Artigo — Odontopediatria', 'kidsBrush', 'Escova infantil e ampulheta de escovação em tons suaves.'),
  articleImplant: img('article-implant', 'Artigo — Próteses x implantes', 'implantVsProsthesis', 'Comparação ilustrada entre prótese fixa sobre dentes e coroa sobre implante.'),
} satisfies Record<string, ImageAsset>;

export type ImageId = keyof typeof images;
