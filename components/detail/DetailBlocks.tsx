import Image from 'next/image';
import type { CardTone, CopyBlock, DetailBlock, SplitItem } from '@/constants';
import { cn } from '@/lib/utils';
import { Hop } from '@/components/motion/Hop';
import { Reveal } from '@/components/motion/Reveal';

const TONE: Record<CardTone, string> = {
  pink: 'bg-brand-pink text-white',
  orange: 'bg-brand-orange text-white',
  cyan: 'bg-brand-cyan text-brand-ink',
  lime: 'bg-brand-lime text-brand-ink',
  ink: 'bg-brand-ink text-white',
  outline: 'border-[6px] border-white text-white',
};

const ALIGN = { left: 'text-left', center: 'text-center', right: 'text-right' } as const;

const CARD_PADDING = 'px-7 py-10 sm:px-14 sm:py-14';

/** Eyebrow + heading + paragraph, the unit every block is built from. */
function Copy({ eyebrow, title, body, size = 'lg' }: CopyBlock & { size?: 'lg' | 'md' }) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-wide sm:text-base">{eyebrow}</p>
      <h2
        className={cn(
          'mt-2 font-bold leading-tight tracking-tight',
          size === 'lg' ? 'text-2xl sm:text-4xl lg:text-[3.125rem]' : 'text-2xl sm:text-4xl'
        )}
      >
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed sm:text-lg">{body}</p>
    </>
  );
}

function Card({ block }: { block: Extract<DetailBlock, { kind: 'card' }> }) {
  const { tone, align = 'left', corner = 'tr', cutout, continuation } = block;
  const cornerClass = corner === 'tl' ? 'rounded-tl-[3rem] sm:rounded-tl-[5rem]' : 'rounded-tr-[3rem] sm:rounded-tr-[5rem]';

  return (
    // Top padding leaves room for a cut-out that rises above the card on desktop.
    <div className={cn('relative', cutout && 'lg:pt-28')}>
      {cutout && (
        // On desktop the photo is as tall as card + top padding, so it always rises out of the card.
        // It hops on hover.
        <Hop
          height={20}
          className={cn(
            'relative z-10 mx-auto w-3/5 sm:w-2/5 lg:absolute lg:inset-y-0 lg:mx-0 lg:flex lg:w-[42%] lg:items-end',
            cutout.side === 'left' ? 'lg:left-[4%] lg:justify-start' : 'lg:right-[3%] lg:justify-end'
          )}
        >
          <Image
            src={cutout.src}
            alt={cutout.alt}
            width={cutout.width}
            height={cutout.height}
            sizes="(min-width: 1024px) 40vw, 60vw"
            className="h-auto w-full lg:h-full lg:w-auto lg:max-w-full lg:object-contain lg:object-bottom"
          />
        </Hop>
      )}

      <div
        className={cn(
          'overflow-hidden',
          TONE[tone],
          cornerClass,
          ALIGN[align],
          CARD_PADDING,
          cutout && (cutout.side === 'left' ? 'lg:pl-[46%]' : 'lg:pr-[46%]'),
          // a continuation photo runs to the card's bottom edge, so drop the bottom radius there
          continuation && 'rounded-br-[3rem] sm:rounded-br-[5rem]'
        )}
      >
        <div className={cn(align === 'center' && 'mx-auto max-w-4xl')}>
          <Copy {...block} />
        </div>

        {continuation && (
          <>
            <div className="relative -mx-7 mt-10 aspect-[16/9] sm:-mx-14 sm:aspect-[912/260]">
              <Image
                src={continuation.photo.src}
                alt={continuation.photo.alt}
                fill
                sizes="(min-width: 1152px) 1152px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="mt-10">
              <Copy {...continuation} size="md" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TextBlock({ block }: { block: Extract<DetailBlock, { kind: 'text' }> }) {
  const { align = 'left', accent, ink } = block;
  return (
    <div
      className={cn(
        ink ? 'text-brand-ink' : 'text-white',
        align === 'center' ? 'mx-auto max-w-4xl text-center' : 'text-left',
        accent ? 'border-l-[3px] border-brand-orange py-1 pl-6 sm:pl-14' : align === 'left' && 'sm:px-14'
      )}
    >
      <Copy {...block} size="md" />
    </div>
  );
}

function SplitSide({ item, className }: { item: SplitItem; className?: string }) {
  if (item.type === 'photo') {
    return (
      <div className={cn('relative min-h-64 overflow-hidden rounded-br-[3rem] sm:rounded-br-[5rem]', className)}>
        <Image
          src={item.photo.src}
          alt={item.photo.alt}
          fill
          sizes="(min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (item.type === 'card') {
    return (
      <div className={cn(TONE[item.tone], 'rounded-tl-[3rem] sm:rounded-tl-[5rem]', CARD_PADDING, className)}>
        <Copy {...item} size="md" />
      </div>
    );
  }

  return (
    <div className={cn('py-2 text-white sm:py-10', className)}>
      <Copy {...item} size="md" />
    </div>
  );
}

function Split({ block }: { block: Extract<DetailBlock, { kind: 'split' }> }) {
  const plainCopy = block.left.type === 'copy';
  return (
    <div className={cn('grid gap-8 sm:grid-cols-2', plainCopy ? 'sm:gap-0' : 'sm:gap-6 lg:gap-8')}>
      <SplitSide item={block.left} className={cn(plainCopy && 'sm:pl-14 sm:pr-10')} />
      <SplitSide
        item={block.right}
        className={cn(
          block.right.type === 'copy' && 'sm:pl-10 lg:pl-12',
          block.divider && 'sm:my-6 sm:border-l-[3px] sm:border-white sm:py-4'
        )}
      />
    </div>
  );
}

function PhotoBlock({ block }: { block: Extract<DetailBlock, { kind: 'photo' }> }) {
  const { photo, fullBleed, corners = 'tr' } = block;
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        fullBleed
          ? 'left-1/2 aspect-[16/9] w-screen -translate-x-1/2 sm:aspect-[1920/350]'
          : cn(
              'aspect-[16/9] sm:aspect-[912/295]',
              corners === 'tr'
                ? 'rounded-tr-[3rem] sm:rounded-tr-[5rem]'
                : 'rounded-tl-[3rem] rounded-br-[3rem] sm:rounded-tl-[5rem] sm:rounded-br-[5rem]'
            )
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={fullBleed ? '100vw' : '(min-width: 1152px) 1152px, 90vw'}
        className="object-cover"
      />
    </div>
  );
}

function Cutout({ block }: { block: Extract<DetailBlock, { kind: 'cutout' }> }) {
  const { photo, size = 'lg' } = block;
  return (
    // Negative margin cancels the stack gap so the photo stands on the next block.
    <Hop height={14} tilt={0} className={cn('relative z-10 mx-auto -mb-10 sm:-mb-14', size === 'lg' ? 'w-full sm:w-[92%]' : 'w-3/5 sm:w-[34%]')}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={size === 'lg' ? '(min-width: 1152px) 1060px, 90vw' : '(min-width: 640px) 34vw, 60vw'}
        className="h-auto w-full"
      />
    </Hop>
  );
}

export function DetailBlocks({ blocks }: { blocks: DetailBlock[] }) {
  return (
    <div className="mx-auto flex w-[90%] max-w-6xl flex-col gap-10 sm:gap-14">
      {/* Each block slides into view as it is scrolled to */}
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'card':
            return (
              <Reveal key={i}>
                <Card block={block} />
              </Reveal>
            );
          case 'text':
            return (
              <Reveal key={i} from={block.accent ? 'left' : 'up'}>
                <TextBlock block={block} />
              </Reveal>
            );
          case 'split':
            return (
              <Reveal key={i}>
                <Split block={block} />
              </Reveal>
            );
          case 'photo':
            return (
              <Reveal key={i} from="zoom">
                <PhotoBlock block={block} />
              </Reveal>
            );
          case 'cutout':
            return (
              <Reveal key={i} from="pop" className="relative z-10">
                <Cutout block={block} />
              </Reveal>
            );
        }
      })}
    </div>
  );
}
