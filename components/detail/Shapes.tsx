import { cn } from '@/lib/utils';
import { DriftBox } from '@/components/motion/Drift';

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

const CIRCLE = 'rounded-full';

/**
 * Decorative shapes behind a detail-page hero. `service` pages put the orange
 * circle high on the right; `audience` pages drop it lower and add a white
 * triangle over the first card. Each shape floats, drifts with scroll and the
 * mouse, and the triangles react to hover/tap (see DriftBox).
 */
export function HeroShapes({ variant, accent }: { variant: 'service' | 'audience'; accent: 'pink' | 'cyan' }) {
  const accentBg = accent === 'pink' ? 'bg-brand-pink' : 'bg-brand-cyan';

  if (variant === 'service') {
    return (
      <>
        <DriftBox className="absolute left-[8.5%] top-0 aspect-[142/150] w-[12.3%]" shape={cn(accentBg, TRIANGLE.tilted)} depth={30} spin={10} />
        <DriftBox className="absolute left-[4.3%] top-[52%] hidden aspect-[55/60] w-[4.8%] sm:block" shape={cn('bg-white', TRIANGLE.right)} depth={40} spin={-14} delay={0.2} />
        <DriftBox className="absolute -right-[5%] top-0 aspect-square w-[21%]" shape={cn('bg-brand-orange', CIRCLE)} depth={16} float={9} spin={0} delay={0.1} interactive={false} />
        <DriftBox className="absolute right-[15%] top-[40%] hidden aspect-square w-[5%] sm:block" shape={cn('bg-white', TRIANGLE.notch)} depth={36} spin={16} delay={0.3} />
      </>
    );
  }

  return (
    <>
      <DriftBox className="absolute left-[3.4%] top-[50%] aspect-[142/150] w-[12.3%]" shape={cn(accentBg, TRIANGLE.tilted)} depth={30} spin={10} />
      <DriftBox className="absolute -right-[5%] top-[52%] aspect-square w-[21%]" shape={cn('bg-brand-orange', CIRCLE)} depth={16} float={9} spin={0} delay={0.1} interactive={false} />
      <DriftBox className="absolute right-[12.5%] top-[82%] hidden aspect-square w-[5%] sm:block" shape={cn('bg-white', TRIANGLE.notch)} depth={36} spin={16} delay={0.3} />
      <DriftBox className="absolute -bottom-12 left-[21%] z-10 hidden aspect-[58/55] w-[5%] sm:block" shape={cn('bg-white', TRIANGLE.down)} depth={30} spin={-12} delay={0.4} />
    </>
  );
}

/** Pink and cyan circles either side of the closing CTA. */
export function ClosingShapes() {
  return (
    <>
      <DriftBox className="absolute -left-[3%] top-[25%] aspect-square w-[21%]" shape={cn('bg-brand-pink', CIRCLE)} depth={18} float={9} spin={0} interactive={false} />
      <DriftBox className="absolute left-[15.8%] top-[34%] aspect-[60/52] w-[5.2%]" shape={cn('bg-brand-ink', TRIANGLE.up)} depth={36} spin={18} delay={0.2} />
      <DriftBox className="absolute -right-[14%] top-[10%] aspect-square w-[33%]" shape={cn('bg-brand-cyan', CIRCLE)} depth={20} float={10} spin={0} delay={0.1} interactive={false} />
      <DriftBox className="absolute bottom-[-2%] left-[70%] aspect-square w-[6.5%]" shape={cn('bg-white', TRIANGLE.notch)} depth={34} spin={-16} delay={0.3} />
    </>
  );
}
