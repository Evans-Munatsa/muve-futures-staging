import { cn } from '@/lib/utils';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';

interface PageHeroProps {
  badge: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/** Centred page intro: outlined badge, large heading, lede copy and an optional CTA. */
export function PageHero({ badge, title, children, action, className }: PageHeroProps) {
  return (
    // Badge, heading, copy and action arrive one after another on page load.
    <Stagger onLoad stagger={0.15} delay={0.1} className={cn('relative z-20 mx-auto w-[90%] max-w-4xl pt-10 pb-10 text-center sm:pt-14', className)}>
      <StaggerItem from="pop">
        <span className="inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-wide text-white sm:text-lg">
          {badge}
        </span>
      </StaggerItem>

      <StaggerItem>
        <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-7xl">
          {title}
        </h1>
      </StaggerItem>

      <StaggerItem>
        <div className="mx-auto mt-6 max-w-4xl text-sm leading-relaxed text-white sm:text-lg">{children}</div>
      </StaggerItem>

      {action && (
        <StaggerItem from="pop" className="mt-8">
          {action}
        </StaggerItem>
      )}
    </Stagger>
  );
}
