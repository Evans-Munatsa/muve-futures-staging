import type { DetailPageContent } from '@/constants';
import { CtaButton } from '@/components/detail/CtaButton';
import { DetailBlocks } from '@/components/detail/DetailBlocks';
import { ClosingShapes, HeroShapes } from '@/components/detail/Shapes';
import { cn } from '@/lib/utils';

interface DetailPageProps {
  content: DetailPageContent;
  variant: 'service' | 'audience';
  /** Colour of the large hero triangle. */
  accent?: 'pink' | 'cyan';
  /** Service name to preselect in the referral form. */
  referralService?: string;
}

/** Shared template for /services/[slug] and /who-we-support/[slug]. */
export function DetailPage({ content, variant, accent = 'pink', referralService }: DetailPageProps) {
  const { hero, blocks, closing } = content;

  return (
    <div className="w-full overflow-hidden bg-brand-green">
      <section className="relative">
        <HeroShapes variant={variant} accent={accent} />

        <div
          className={cn(
            'relative z-10 mx-auto w-[90%] pt-10 pb-12 text-center text-white sm:pt-14 sm:pb-16',
            // audience headlines run wider in the design; service ones stay clear of the orange circle
            variant === 'audience' ? 'max-w-6xl' : 'max-w-5xl'
          )}
        >
          <p className="inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-wide sm:text-lg">
            {hero.badge}
          </p>

          <h1
            className={cn(
              'mx-auto mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-7xl',
              variant === 'service' && 'max-w-[52rem]'
            )}
          >
            {hero.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed sm:text-lg">{hero.intro}</p>

          <div className="mt-8">
            <CtaButton cta={hero.cta} referralService={referralService} />
          </div>
        </div>
      </section>

      <DetailBlocks blocks={blocks} />

      <section className="relative">
        <ClosingShapes />

        <div className="relative z-10 mx-auto w-[90%] max-w-4xl py-16 text-center text-white sm:py-24">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {closing.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed sm:text-lg">{closing.body}</p>
          <div className="mt-8">
            <CtaButton cta={closing.cta} referralService={referralService} />
          </div>
        </div>
      </section>
    </div>
  );
}
