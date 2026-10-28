import type { StructureId } from './structures';

/**
 * Alternativa estática e interativa ao 3D (sem WebGL, aparelhos menos potentes
 * ou preferência por movimento reduzido no mobile). Corte esquemático 2D.
 */
export function ToothFallback({ selected, onSelect }: { selected: StructureId | null; onSelect: (id: StructureId) => void }) {
  const o = (id: StructureId) => (selected && selected !== id ? 0.25 : 1);
  const hl = (id: StructureId) => (selected === id ? '#334C4B' : 'none');
  const part = (id: StructureId) => ({
    style: { opacity: o(id), transition: 'opacity .5s ease', cursor: 'pointer' },
    onClick: () => onSelect(id),
  });
  return (
    <svg viewBox="-220 -60 440 520" className="h-full w-full" role="img" aria-label="Corte esquemático de um dente com esmalte, dentina, polpa, raiz e estruturas de suporte">
      {/* suporte: osso + gengiva + ligamento */}
      <g {...part('support')}>
        <rect x={-200} y={130} width={400} height={330} rx={30} fill="#EFE6D6" stroke={hl('support')} strokeWidth={3} />
        <path d="M-200,150 C-150,110 -100,96 -78,104 L78,104 C100,96 150,110 200,150 L200,170 L-200,170Z" fill="#D79C96" />
        <path d="M-80,150 C-70,250 -50,340 -26,404 M80,150 C70,250 50,340 26,404" stroke="#A6BDB5" strokeWidth={6} fill="none" />
      </g>
      {/* raiz (cemento) */}
      <path
        {...part('root')}
        d="M-74,120 C-70,200 -58,300 -30,390 C-20,410 -8,410 -4,390 L0,250 L4,390 C8,410 20,410 30,390 C58,300 70,200 74,120Z"
        fill="#E6D2B4"
        stroke={hl('root')}
        strokeWidth={3}
      />
      {/* esmalte */}
      <path
        {...part('enamel')}
        d="M-74,120 C-100,60 -96,0 -60,-20 C-30,-34 -14,-10 0,-14 C14,-10 30,-34 60,-20 C96,0 100,60 74,120 C40,104 -40,104 -74,120Z"
        fill="#F8F5EE"
        stroke={selected === 'enamel' ? '#334C4B' : '#E2D9C7'}
        strokeWidth={3}
      />
      {/* dentina */}
      <path
        {...part('dentin')}
        d="M-58,110 C-80,62 -74,14 -48,0 C-26,-10 -12,8 0,4 C12,8 26,-10 48,0 C74,14 80,62 58,110 C56,200 46,300 22,380 C16,392 10,388 8,376 L0,250 L-8,376 C-10,388 -16,392 -22,380 C-46,300 -56,200 -58,110Z"
        fill="#EBD5B0"
        stroke={hl('dentin')}
        strokeWidth={3}
      />
      {/* polpa */}
      <path
        {...part('pulp')}
        d="M-26,96 C-34,60 -24,40 -12,50 C-6,44 6,44 12,50 C24,40 34,60 26,96 C22,170 16,280 8,368 L4,368 L0,240 L-4,368 L-8,368 C-16,280 -22,170 -26,96Z"
        fill="#D9837A"
        stroke={hl('pulp')}
        strokeWidth={3}
      />
    </svg>
  );
}
