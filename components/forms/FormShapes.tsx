import { CIRCLE, TRIANGLE } from '@/components/detail/Shapes';
import { DriftBox } from '@/components/motion/Drift';
import { cn } from '@/lib/utils';

/*
 * The decorative shapes on each form page, placed as in public/design. Top
 * offsets are measured from the top of the page content (under the navbar).
 * Below lg they fall back to percentages of the width, and the smaller ones hide.
 */

/**
 * Pink triangle on the left, orange circle cut off on the right with a white
 * notch. Hidden on phones, where they would sit on top of the heading.
 */
function HeroTrio({ triangle, circle, notch, accent = 'bg-brand-pink' }: { triangle: string; circle: string; notch: string; accent?: string }) {
  return (
    <>
      <DriftBox className={cn('absolute hidden aspect-[190/196] sm:block', triangle)} shape={cn(accent, TRIANGLE.tilted)} depth={30} spin={10} />
      <DriftBox className={cn('absolute hidden aspect-square sm:block', circle)} shape={cn('bg-brand-orange', CIRCLE)} depth={16} float={9} spin={0} delay={0.1} interactive={false} />
      <DriftBox className={cn('absolute hidden aspect-square sm:block', notch)} shape={cn('bg-white', TRIANGLE.notch)} depth={36} spin={16} delay={0.3} />
    </>
  );
}

export function PartnershipShapes() {
  return (
    <HeroTrio
      triangle="left-[4%] top-40 w-[10%] lg:u-left-85 lg:u-top-411 lg:u-w-190"
      circle="-right-[8%] top-52 w-[21%] lg:-u-right-170 lg:u-top-475 lg:u-w-398"
      notch="right-[10%] top-80 w-[5%] lg:u-left-1638 lg:u-top-707 lg:u-w-94"
    />
  );
}

export function FeedbackShapes() {
  return (
    <HeroTrio
      triangle="left-[3.5%] top-36 w-[12%] lg:u-left-67 lg:u-top-288 lg:u-w-236"
      circle="-right-[6%] top-32 w-[21%] lg:-u-right-116 lg:u-top-262 lg:u-w-396"
      notch="right-[13%] top-72 w-[5%] lg:u-left-1586 lg:u-top-491 lg:u-w-93"
    />
  );
}

/** Around the call to action under the feedback form; offsets are from the top of that section. */
export function FeedbackClosingShapes() {
  return (
    <>
      <DriftBox
        className="absolute -top-8 -left-[6%] aspect-square w-[21%] lg:-u-top-119 lg:-u-left-48 lg:u-w-398"
        shape={cn('bg-brand-pink', CIRCLE)}
        depth={18}
        float={9}
        spin={0}
        interactive={false}
      />
      <DriftBox className="absolute top-0 left-[15%] aspect-[98/87] w-[5%] lg:-u-top-52 lg:u-left-303 lg:u-w-98" shape={cn('bg-brand-ink', TRIANGLE.up)} depth={36} spin={18} delay={0.2} />
      <DriftBox
        className="absolute -top-10 -right-[14%] aspect-square w-[33%] lg:-u-top-133 lg:u-left-1555 lg:u-w-642"
        shape={cn('bg-brand-cyan', CIRCLE)}
        depth={20}
        float={10}
        spin={0}
        interactive={false}
      />
      <DriftBox
        className="absolute bottom-0 left-[70%] hidden aspect-[124/128] w-[6.5%] sm:block lg:bottom-auto lg:u-top-257 lg:u-left-1340 lg:u-w-124"
        shape={cn('bg-white', TRIANGLE.right)}
        depth={34}
        spin={-16}
        delay={0.3}
      />
    </>
  );
}

/** The referral page is long, so it has shapes down both sides. */
export function ReferralShapes() {
  return (
    <>
      <HeroTrio
        accent="bg-brand-cyan"
        triangle="left-[4%] top-8 w-[12%] lg:u-left-90 lg:u-top-13 lg:u-w-240"
        circle="-right-[8%] top-60 w-[18%] lg:-u-right-141 lg:u-top-478 lg:u-w-405"
        notch="right-[7%] top-48 w-[5%] lg:u-left-1703 lg:u-top-431 lg:u-w-90"
      />
      <DriftBox
        className="absolute top-[36%] -left-[9%] hidden aspect-square w-[21%] lg:block lg:u-top-1303 lg:-u-left-165 lg:u-w-405"
        shape={cn('bg-brand-pink', CIRCLE)}
        depth={18}
        float={9}
        spin={0}
        interactive={false}
      />
      <DriftBox
        className="absolute hidden aspect-[100/93] lg:block lg:u-top-1368 lg:u-left-188 lg:u-w-100"
        shape={cn('bg-brand-ink', TRIANGLE.up)}
        depth={36}
        spin={18}
        delay={0.2}
      />
      <DriftBox
        className="absolute hidden aspect-[163/150] lg:block lg:u-top-1853 lg:u-left-1672 lg:u-w-163"
        shape={cn('bg-brand-ink', TRIANGLE.up)}
        depth={32}
        spin={-20}
        delay={0.2}
      />
      <DriftBox
        className="absolute hidden aspect-square lg:block lg:u-top-2627 lg:u-left-1615 lg:u-w-650"
        shape={cn('bg-brand-cyan', CIRCLE)}
        depth={20}
        float={10}
        spin={0}
        interactive={false}
      />
      <DriftBox
        className="absolute hidden aspect-square lg:block lg:u-top-2601 lg:u-left-1682 lg:u-w-116"
        shape={cn('bg-white', TRIANGLE.notch)}
        depth={36}
        spin={16}
        delay={0.3}
      />
      <DriftBox
        className="absolute hidden aspect-[114/134] lg:block lg:u-top-2980 lg:u-left-85 lg:u-w-114"
        shape={cn('bg-white', TRIANGLE.left)}
        depth={34}
        spin={-16}
        delay={0.3}
      />
    </>
  );
}
