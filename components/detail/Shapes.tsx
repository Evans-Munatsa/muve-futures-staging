import { cn } from '@/lib/utils';

// Triangles are clip-paths on plain boxes so they scale with the viewport like the design.
const TRIANGLE = {
  // pointing right, as on the left edge of every detail hero
  right: '[clip-path:polygon(0_0,100%_50%,0_100%)]',
  // the large tilted triangle in the top-left of the service heroes
  tilted: '[clip-path:polygon(22%_0,100%_66%,0_100%)]',
  // the white triangle tucked under the orange circle
  notch: '[clip-path:polygon(100%_0,72%_100%,0_38%)]',
  up: '[clip-path:polygon(50%_0,100%_100%,0_100%)]',
  down: '[clip-path:polygon(0_0,100%_0,45%_100%)]',
};

function Shape({ className }: { className: string }) {
  return <div aria-hidden="true" className={cn('pointer-events-none absolute', className)} />;
}

/**
 * Decorative shapes behind a detail-page hero. `service` pages put the orange
 * circle high on the right; `audience` pages drop it lower and add a white
 * triangle over the first card.
 */
export function HeroShapes({ variant, accent }: { variant: 'service' | 'audience'; accent: 'pink' | 'cyan' }) {
  const accentBg = accent === 'pink' ? 'bg-brand-pink' : 'bg-brand-cyan';

  if (variant === 'service') {
    return (
      <>
        <Shape className={cn('left-[8.5%] top-0 aspect-[142/150] w-[12.3%]', accentBg, TRIANGLE.tilted)} />
        <Shape className={cn('left-[4.3%] top-[52%] hidden aspect-[55/60] w-[4.8%] bg-white sm:block', TRIANGLE.right)} />
        <Shape className="-right-[5%] top-0 aspect-square w-[21%] rounded-full bg-brand-orange" />
        <Shape className={cn('right-[15%] top-[40%] hidden aspect-square w-[5%] bg-white sm:block', TRIANGLE.notch)} />
      </>
    );
  }

  return (
    <>
      <Shape className={cn('left-[3.4%] top-[50%] aspect-[142/150] w-[12.3%]', accentBg, TRIANGLE.tilted)} />
      <Shape className="-right-[5%] top-[52%] aspect-square w-[21%] rounded-full bg-brand-orange" />
      <Shape className={cn('right-[12.5%] top-[82%] hidden aspect-square w-[5%] bg-white sm:block', TRIANGLE.notch)} />
      <Shape className={cn('-bottom-12 left-[21%] z-10 hidden aspect-[58/55] w-[5%] bg-white sm:block', TRIANGLE.down)} />
    </>
  );
}

/** Pink and cyan circles either side of the closing CTA. */
export function ClosingShapes() {
  return (
    <>
      <Shape className="-left-[3%] top-[25%] aspect-square w-[21%] rounded-full bg-brand-pink" />
      <Shape className={cn('left-[15.8%] top-[34%] aspect-[60/52] w-[5.2%] bg-brand-ink', TRIANGLE.up)} />
      <Shape className="-right-[14%] top-[10%] aspect-square w-[33%] rounded-full bg-brand-cyan" />
      <Shape className={cn('bottom-[-2%] left-[70%] aspect-square w-[6.5%] bg-white', TRIANGLE.notch)} />
    </>
  );
}
