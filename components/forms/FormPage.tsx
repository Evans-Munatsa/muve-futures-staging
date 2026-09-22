import { HeroShapes } from '@/components/detail/Shapes';
import { cn } from '@/lib/utils';

interface FormPageProps {
  badge: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
  /** Optional column beside the white card (contact details, next steps...). */
  aside?: React.ReactNode;
  id?: string;
}

/**
 * Full-page layout for a form or long-form page: the brand hero from the detail
 * pages, then the content in a white card with the signature curved corner.
 */
export function FormPage({ badge, title, intro, children, aside, id }: FormPageProps) {
  return (
    <div className="w-full overflow-hidden bg-brand-green">
      <section className="relative">
        <HeroShapes variant="audience" accent="cyan" />

        <div className="relative z-10 mx-auto w-[90%] max-w-4xl pt-10 pb-12 text-center text-white sm:pt-14 sm:pb-16">
          <p className="inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-wide sm:text-lg">
            {badge}
          </p>
          <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <div className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed sm:text-lg">{intro}</div>
        </div>
      </section>

      <div
        id={id}
        className={cn(
          'relative z-10 mx-auto w-[90%] scroll-mt-36 pb-20 sm:pb-28',
          aside ? 'grid max-w-6xl gap-8 lg:grid-cols-[1fr_20rem]' : 'max-w-4xl'
        )}
      >
        <div className="rounded-tr-[3rem] bg-white px-6 py-10 text-brand-ink sm:rounded-tr-[5rem] sm:px-12 sm:py-12">
          {children}
        </div>
        {aside && <aside className="space-y-6">{aside}</aside>}
      </div>
    </div>
  );
}

/** Coloured side panel for use in `FormPage`'s aside. */
export function AsidePanel({
  title,
  tone = 'cyan',
  children,
}: {
  title: string;
  tone?: 'cyan' | 'pink' | 'orange';
  children: React.ReactNode;
}) {
  const toneClass = {
    cyan: 'bg-brand-cyan text-brand-ink',
    pink: 'bg-brand-pink text-white',
    orange: 'bg-brand-orange text-white',
  }[tone];

  return (
    <div className={cn('rounded-tl-[2.5rem] px-7 py-8', toneClass)}>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
