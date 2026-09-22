import { cn } from '@/lib/utils';

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
    <section className={cn('relative z-20 mx-auto w-[90%] max-w-4xl pt-10 pb-10 text-center sm:pt-14', className)}>
      <span className="inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-wide text-white sm:text-lg">
        {badge}
      </span>

      <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-7xl">
        {title}
      </h1>

      <div className="mx-auto mt-6 max-w-4xl text-sm leading-relaxed text-white sm:text-lg">{children}</div>

      {action && <div className="mt-8">{action}</div>}
    </section>
  );
}
