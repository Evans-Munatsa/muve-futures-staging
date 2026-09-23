import { Lines } from '@/components/common/Lines';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';

interface DesignFormPageProps {
  badge: string;
  title: string;
  /** Bold line above the form; hidden when empty. */
  intro?: string;
  /** Decorative shapes, positioned against the whole page. */
  shapes?: React.ReactNode;
  /** Space under the heading before the form (design pixels differ per page). */
  heroClassName?: string;
  children: React.ReactNode;
  /** Optional section after the form, e.g. a call to action. */
  after?: React.ReactNode;
}

/**
 * Layout of the form pages in public/design: outlined badge and large heading,
 * then the form directly on the green page, 1200 design pixels wide.
 */
export function DesignFormPage({ badge, title, intro, shapes, heroClassName, children, after }: DesignFormPageProps) {
  return (
    // Clipped sideways only, and above the footer: in the designs the big
    // circles near the bottom run down into the footer's space.
    <div className="relative z-10 w-full overflow-x-clip bg-brand-green">
      {shapes}

      <Stagger
        onLoad
        stagger={0.15}
        delay={0.1}
        className={cn('relative z-10 mx-auto w-[90%] pt-10 pb-12 text-center text-white sm:pt-14 sm:pb-16 lg:u-pt-49', heroClassName)}
      >
        <StaggerItem from="pop">
          <p className="inline-flex min-w-40 items-center justify-center rounded-full border-[3px] border-white px-5 py-1 text-xs font-bold uppercase tracking-wide sm:text-lg lg:u-h-49 lg:u-min-w-296 lg:u-px-30 lg:py-0 lg:u-text-22 lg:u-border-5">
            {badge}
          </p>
        </StaggerItem>
        <StaggerItem>
          <h1 className="mt-6 text-3xl font-bold leading-[1.22] tracking-tight sm:text-5xl lg:u-mt-31 lg:u-text-94">
            <Lines text={title} />
          </h1>
        </StaggerItem>
      </Stagger>

      <Reveal onLoad delay={0.4} className="relative z-10 mx-auto w-[90%] pb-20 sm:pb-28 lg:u-w-1200 lg:u-pb-120">
        {intro && <p className="mb-8 text-base font-bold text-brand-ink lg:u-mb-34 lg:u-text-23">{intro}</p>}
        {children}
      </Reveal>

      {after}
    </div>
  );
}
