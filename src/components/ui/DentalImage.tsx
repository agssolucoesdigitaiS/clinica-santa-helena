import { images, type ImageId } from '@/data/images';
import { Scene } from './illustrations/scenes';
import { cn } from '@/lib/cn';

interface Props {
  id: ImageId;
  className?: string;
  /** atributo sizes do <img> responsivo */
  sizes?: string;
  priority?: boolean;
  /** exibe a etiqueta "Placeholder" quando não há fotografia */
  tag?: boolean;
  tagPosition?: 'tl' | 'bl' | 'br' | 'bc';
  imgClassName?: string;
}

/**
 * Renderiza a fotografia licenciada (AVIF/WebP/JPG + srcset) quando existir;
 * caso contrário, uma ilustração-placeholder temática identificada.
 */
export function DentalImage({ id, className, sizes = '100vw', priority, tag = true, tagPosition = 'bl', imgClassName }: Props) {
  const asset = images[id];
  const pos = { tl: 'left-3 top-3', bl: 'left-3 bottom-3', br: 'right-3 bottom-3', bc: 'left-1/2 bottom-[12%] -translate-x-1/2 max-w-[70%]' }[tagPosition];

  if (asset.photo) {
    const { base, widths, width, height } = asset.photo;
    const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
    return (
      <picture className={cn('block h-full w-full', className)}>
        <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        <img
          src={`${base}-${widths[Math.floor(widths.length / 2)]}.jpg`}
          srcSet={set('jpg')}
          sizes={sizes}
          width={width}
          height={height}
          alt={asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // @ts-expect-error atributo ainda não tipado no React 18
          fetchpriority={priority ? 'high' : 'auto'}
          className={cn('h-full w-full object-cover', imgClassName)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
          }}
        />
      </picture>
    );
  }

  return (
    <div role="img" aria-label={`${asset.alt} (ilustração provisória)`} className={cn('relative h-full w-full overflow-hidden bg-mist', className)}>
      <Scene scene={asset.scene} className={cn('absolute inset-0 h-full w-full', imgClassName)} />
      {tag && (
        <span
          className={cn(
            'pointer-events-none absolute z-[2] max-w-[85%] truncate rounded-full bg-white/80 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.08em] text-petrol backdrop-blur',
            pos,
          )}
          title="Substituir por fotografia licenciada — ver src/data/images.ts"
        >
          Placeholder · {asset.brief}
        </span>
      )}
    </div>
  );
}
