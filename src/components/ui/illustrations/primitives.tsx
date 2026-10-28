/* Primitivas vetoriais das ilustrações-placeholder (estilo editorial, sem rostos). */
import { useId, type ReactNode } from 'react';

export const C = {
  ivory: '#F7F5F0',
  sage: '#A6BDB5',
  sageSoft: '#C9D8D2',
  sageInk: '#5E7A71',
  petrol: '#334C4B',
  sand: '#D8C5B3',
  sandSoft: '#EADFD3',
  mist: '#E5E9E7',
  deep: '#22302F',
  white: '#FFFFFF',
  wood: '#C7A587',
  woodDark: '#A9876A',
  stone: '#ECE6DC',
  steel: '#B9C2C0',
  steelDark: '#8D9997',
  gum: '#D9A7A1',
  gumDark: '#C48A84',
  lip: '#C98F86',
  tooth: '#F4EFE4',
  toothShade: '#E6DDCB',
  bone: '#EBE0CC',
  pulp: '#D68F86',
  dentin: '#EFDDBF',
};

export const SKIN = ['#E8C6A8', '#C99A78', '#9A6B4E', '#F0D2B8'];
export const HAIR = ['#3A2C25', '#6B4A36', '#22302F', '#8A6A4F'];

export type HairStyle = 'short' | 'bun' | 'long' | 'curly' | 'ponytail' | 'kid';

interface PersonProps {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  pose?: 'stand' | 'sit';
  coat?: string;
  inner?: string;
  pants?: string;
  skin?: string;
  hair?: string;
  hairStyle?: HairStyle;
  arm?: 'down' | 'forward' | 'raise' | 'lap';
}

export function Hair({ style, color }: { style: HairStyle; color: string }) {
  const cap = 'M-26,-270 C-28,-306 28,-306 26,-270 C20,-290 -20,-290 -26,-270Z';
  switch (style) {
    case 'bun':
      return (
        <g fill={color}>
          <path d={cap} />
          <circle cx={4} cy={-304} r={13} />
        </g>
      );
    case 'long':
      return (
        <g fill={color}>
          <path d="M-27,-268 C-30,-310 30,-310 27,-268 L30,-226 C22,-222 18,-236 18,-256 C14,-284 -14,-284 -18,-256 C-18,-236 -22,-222 -30,-226Z" />
        </g>
      );
    case 'curly':
      return (
        <g fill={color}>
          {[-22, -11, 0, 11, 22].map((cx, i) => (
            <circle key={i} cx={cx} cy={-292 - (i % 2) * 6} r={13} />
          ))}
          <circle cx={-26} cy={-274} r={9} />
          <circle cx={26} cy={-274} r={9} />
        </g>
      );
    case 'ponytail':
      return (
        <g fill={color}>
          <path d={cap} />
          <path d="M22,-288 C44,-284 44,-250 34,-236 C34,-254 30,-272 20,-280Z" />
        </g>
      );
    case 'kid':
      return (
        <g fill={color}>
          <path d="M-26,-266 C-30,-306 30,-306 26,-266 C22,-286 -22,-286 -26,-266Z" />
        </g>
      );
    default:
      return <path fill={color} d="M-25,-272 C-26,-302 26,-302 25,-272 C18,-288 -18,-288 -25,-272Z" />;
  }
}

/** Figura humana estilizada sem rosto. Origem nos pés (stand) ou no assento (sit). */
export function Person({
  x,
  y,
  s = 1,
  flip,
  pose = 'stand',
  coat = C.white,
  inner = C.sage,
  pants = C.petrol,
  skin = SKIN[0],
  hair = HAIR[0],
  hairStyle = 'short',
  arm = 'down',
}: PersonProps) {
  const seatedOffset = pose === 'sit' ? 0 : 0;
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      {/* sombra */}
      <ellipse cx={pose === 'sit' ? 20 : 0} cy={2} rx={pose === 'sit' ? 70 : 46} ry={7} fill={C.deep} opacity={0.08} />
      {pose === 'stand' ? (
        <g fill={pants}>
          <path d="M-34,-124 L-30,0 L-7,0 L-4,-104 L4,-104 L7,0 L30,0 L34,-124Z" />
          <ellipse cx={-18} cy={0} rx={15} ry={5} fill={C.deep} />
          <ellipse cx={18} cy={0} rx={15} ry={5} fill={C.deep} />
        </g>
      ) : (
        <g fill={pants} transform={`translate(0,${seatedOffset})`}>
          <path d="M-42,-128 L58,-128 C72,-128 74,-100 60,-98 L-42,-98Z" />
          <path d="M44,-110 L70,-110 L66,-4 L46,-4Z" />
          <ellipse cx={62} cy={-2} rx={18} ry={5} fill={C.deep} />
        </g>
      )}
      <g transform={pose === 'sit' ? 'translate(0,0)' : 'translate(0,0)'}>
        {/* torso */}
        <path
          d="M-46,-118 C-52,-182 -46,-222 -20,-234 L20,-234 C46,-222 52,-182 46,-118 Z"
          fill={coat}
          stroke={coat === C.white ? '#E2E6E4' : 'none'}
          strokeWidth={2}
        />
        <path d="M-15,-234 L0,-200 L15,-234Z" fill={inner} />
        {coat === C.white && <path d="M0,-200 L0,-124" stroke="#E2E6E4" strokeWidth={2} />}
        <rect x={-9} y={-252} width={18} height={22} rx={6} fill={skin} />
        <ellipse cx={0} cy={-272} rx={24} ry={28} fill={skin} />
        <Hair style={hairStyle} color={hair} />
        {/* braço */}
        {arm === 'down' && (
          <g>
            <path d="M38,-222 C52,-200 54,-160 50,-128 L36,-128 C38,-160 34,-192 30,-210Z" fill={coat} stroke={coat === C.white ? '#E2E6E4' : 'none'} strokeWidth={2} />
            <circle cx={44} cy={-122} r={8} fill={skin} />
          </g>
        )}
        {arm === 'forward' && (
          <g>
            <path d="M34,-222 C48,-206 52,-186 56,-172 L104,-176 L104,-160 L48,-154 C38,-170 32,-194 28,-210Z" fill={coat} stroke={coat === C.white ? '#E2E6E4' : 'none'} strokeWidth={2} />
            <circle cx={110} cy={-168} r={9} fill={skin} />
          </g>
        )}
        {arm === 'raise' && (
          <g>
            <path d="M34,-224 C52,-214 66,-206 84,-226 L94,-216 C76,-188 52,-192 30,-206Z" fill={coat} stroke={coat === C.white ? '#E2E6E4' : 'none'} strokeWidth={2} />
            <circle cx={92} cy={-226} r={9} fill={skin} />
          </g>
        )}
        {arm === 'lap' && (
          <g>
            <path d="M36,-220 C48,-196 46,-160 40,-140 L70,-136 L70,-122 L28,-124 C28,-160 30,-190 28,-210Z" fill={coat} stroke={coat === C.white ? '#E2E6E4' : 'none'} strokeWidth={2} />
            <circle cx={74} cy={-129} r={8} fill={skin} />
          </g>
        )}
      </g>
    </g>
  );
}

/** Cadeira odontológica estilizada (vista lateral). Origem no piso, centro da base. */
export function DentalChair({ x, y, s = 1, color = C.sage, flip }: { x: number; y: number; s?: number; color?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <ellipse cx={0} cy={2} rx={150} ry={10} fill={C.deep} opacity={0.08} />
      <rect x={-60} y={-14} width={120} height={14} rx={7} fill={C.steel} />
      <rect x={-18} y={-80} width={36} height={68} rx={10} fill={C.steelDark} />
      {/* assento + encosto + perneira */}
      <path
        d="M-150,-96 C-150,-112 -130,-118 -110,-116 L60,-108 C78,-107 84,-96 84,-86 L84,-80 L-140,-82 C-148,-82 -150,-88 -150,-96Z"
        fill={color}
      />
      <path d="M60,-104 L150,-210 C158,-220 172,-214 168,-200 L92,-88Z" fill={color} />
      <rect x={146} y={-250} width={50} height={26} rx={13} fill={color} transform="rotate(-48 170 -238)" />
      <path d="M-150,-96 L-196,-60 C-202,-54 -196,-46 -188,-48 L-136,-82Z" fill={color} />
      {/* braço lateral */}
      <rect x={-40} y={-128} width={80} height={10} rx={5} fill={C.steel} />
    </g>
  );
}

/** Refletor odontológico com braço articulado. */
export function Reflector({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} stroke={C.steelDark} strokeWidth={8} strokeLinecap="round" fill="none">
      <path d="M0,0 L0,40 L-90,70 L-130,120" />
      <g transform="translate(-130,130) rotate(18)" stroke="none">
        <rect x={-48} y={-14} width={96} height={30} rx={15} fill={C.steel} />
        <rect x={-36} y={8} width={72} height={10} rx={5} fill="#FFF8E8" />
      </g>
    </g>
  );
}

export function Plant({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={40} ry={6} fill={C.deep} opacity={0.08} />
      <path d="M-28,-60 L28,-60 L22,0 L-22,0Z" fill={C.sand} />
      {[
        'M0,-60 C-10,-120 -50,-150 -70,-170 C-40,-150 -10,-130 0,-60Z',
        'M0,-60 C10,-140 40,-170 64,-190 C40,-150 20,-120 0,-60Z',
        'M0,-60 C-6,-150 -4,-190 6,-230 C10,-180 8,-120 0,-60Z',
        'M0,-60 C-30,-90 -70,-100 -90,-104 C-60,-90 -30,-80 0,-60Z',
        'M0,-60 C30,-96 70,-104 92,-110 C60,-90 30,-80 0,-60Z',
      ].map((d, i) => (
        <path key={i} d={d} fill={i % 2 ? C.sageInk : C.sage} />
      ))}
    </g>
  );
}

export function Window({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#FBFAF6" />
      <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke={C.sandSoft} strokeWidth={6} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={C.sandSoft} strokeWidth={4} />
    </g>
  );
}

/** Fileira de dentes estilizada (vista frontal). */
export function TeethRow({
  x,
  y,
  w,
  h,
  n = 8,
  upper = true,
  color = C.tooth,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  n?: number;
  upper?: boolean;
  color?: string;
}) {
  const items: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const center = Math.abs(t - 0.5) * 2; // 0 centro → 1 bordas
    const tw = (w / n) * (1.05 - center * 0.25);
    const th = h * (1 - center * 0.32);
    const cx = x + t * w;
    const ty = upper ? y : y + (h - th);
    items.push(
      <rect key={i} x={cx - tw / 2 + 1.5} y={ty} width={tw - 3} height={th} rx={Math.min(tw, th) * 0.32} fill={color} stroke={C.toothShade} strokeWidth={1.5} />,
    );
  }
  return <g>{items}</g>;
}

/** Composição de sorriso (lábios + dentes). */
export function Smile({ cx, cy, w, brackets = false }: { cx: number; cy: number; w: number; brackets?: boolean }) {
  const h = w * 0.36;
  const x0 = cx - w / 2;
  const outer = `M${x0},${cy} C${x0 + w * 0.2},${cy - h * 0.8} ${x0 + w * 0.42},${cy - h * 0.62} ${cx},${cy - h * 0.5} C${x0 + w * 0.58},${cy - h * 0.62} ${x0 + w * 0.8},${cy - h * 0.8} ${x0 + w},${cy} C${x0 + w * 0.78},${cy + h * 1.0} ${x0 + w * 0.22},${cy + h * 1.0} ${x0},${cy}Z`;
  const inner = `M${x0 + w * 0.08},${cy - h * 0.02} C${x0 + w * 0.3},${cy - h * 0.42} ${x0 + w * 0.7},${cy - h * 0.42} ${x0 + w * 0.92},${cy - h * 0.02} C${x0 + w * 0.72},${cy + h * 0.62} ${x0 + w * 0.28},${cy + h * 0.62} ${x0 + w * 0.08},${cy - h * 0.02}Z`;
  const tw = w * 0.84;
  const tx = cx - tw / 2;
  const nTeeth = 10;
  const clipId = `smile${useId().replace(/:/g, '')}`;
  return (
    <g>
      <path d={outer} fill={C.lip} />
      <clipPath id={clipId}>
        <path d={inner} />
      </clipPath>
      <path d={inner} fill="#7A4A47" />
      <g clipPath={`url(#${clipId})`}>
        <rect x={x0} y={cy - h * 0.45} width={w} height={h * 0.2} fill={C.gum} />
        <TeethRow x={tx} y={cy - h * 0.32} w={tw} h={h * 0.36} n={nTeeth} upper />
        <TeethRow x={tx + tw * 0.06} y={cy + h * 0.06} w={tw * 0.88} h={h * 0.26} n={nTeeth} upper={false} />
        {brackets && (
          <g>
            <path
              d={`M${tx},${cy - h * 0.13} Q${cx},${cy - h * 0.07} ${tx + tw},${cy - h * 0.13}`}
              stroke={C.steelDark}
              strokeWidth={w * 0.006}
              fill="none"
            />
            {Array.from({ length: nTeeth }).map((_, i) => {
              const t = (i + 0.5) / nTeeth;
              const bx = tx + t * tw;
              const by = cy - h * 0.13 + Math.sin(t * Math.PI) * h * 0.03;
              return <rect key={i} x={bx - w * 0.012} y={by - w * 0.012} width={w * 0.024} height={w * 0.024} rx={w * 0.004} fill={C.steel} stroke={C.steelDark} strokeWidth={1} />;
            })}
          </g>
        )}
      </g>
    </g>
  );
}

/** Dente anatômico em corte (esmalte, dentina, polpa, raízes). Origem no topo da coroa. */
export function ToothSection({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* contorno externo / cemento */}
      <path
        d="M-90,40 C-100,-10 -70,-30 -40,-20 C-20,-30 20,-30 40,-20 C70,-30 100,-10 90,40 C86,90 70,120 66,150 C60,230 50,320 30,360 C22,372 12,360 12,340 C10,280 6,220 0,200 C-6,220 -10,280 -12,340 C-12,360 -22,372 -30,360 C-50,320 -60,230 -66,150 C-70,120 -86,90 -90,40Z"
        fill={C.white}
        stroke={C.toothShade}
        strokeWidth={3}
      />
      {/* dentina */}
      <path
        d="M-72,46 C-80,6 -56,-6 -34,0 C-16,-8 16,-8 34,0 C56,-6 80,6 72,46 C68,90 56,118 52,150 C46,226 38,310 24,346 C18,354 18,340 18,330 C16,270 10,214 0,188 C-10,214 -16,270 -18,330 C-18,340 -18,354 -24,346 C-38,310 -46,226 -52,150 C-56,118 -68,90 -72,46Z"
        fill={C.dentin}
      />
      {/* polpa */}
      <path
        d="M-34,60 C-38,40 -26,30 -16,40 C-8,34 8,34 16,40 C26,30 38,40 34,60 C32,96 24,120 20,150 C16,220 14,290 12,330 C10,336 6,336 6,330 C6,280 4,220 0,190 C-4,220 -6,280 -6,330 C-6,336 -10,336 -12,330 C-14,290 -16,220 -20,150 C-24,120 -32,96 -34,60Z"
        fill={C.pulp}
      />
      {/* linha de esmalte (coroa) */}
      <path d="M-86,70 C-60,96 60,96 86,70" stroke={C.toothShade} strokeWidth={2} fill="none" strokeDasharray="6 6" />
    </g>
  );
}

/** Implante com coroa (corte educacional). Origem no topo da coroa. */
export function ImplantModel({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const threads = [];
  for (let i = 0; i < 9; i++) {
    const ty = 150 + i * 18;
    const half = 30 - i * 1.6;
    threads.push(<path key={i} d={`M${-half - 8},${ty} L${half + 8},${ty + 8}`} stroke={C.steelDark} strokeWidth={5} strokeLinecap="round" />);
  }
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* coroa */}
      <path d="M-62,40 C-70,0 -46,-14 -26,-6 C-10,-14 10,-14 26,-6 C46,-14 70,0 62,40 C58,70 48,86 34,92 L-34,92 C-48,86 -58,70 -62,40Z" fill={C.tooth} stroke={C.toothShade} strokeWidth={3} />
      {/* conexão / pilar */}
      <path d="M-22,92 L22,92 L18,140 L-18,140Z" fill={C.steel} stroke={C.steelDark} strokeWidth={2} />
      {/* corpo do implante */}
      <path d="M-30,140 L30,140 L22,300 C18,316 -18,316 -22,300Z" fill={C.steel} />
      {threads}
    </g>
  );
}
