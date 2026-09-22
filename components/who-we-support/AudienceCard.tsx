import Link from 'next/link';
import { Tilt } from '@/components/motion/Tilt';
import { Audience } from '@/constants';

export function AudienceCard({ audience }: { audience: Audience }) {
  return (
    <Tilt
      as="article"
      max={6}
      id={`card-audience-${audience.slug}`}
      className="flex w-full flex-col rounded-tr-[3rem] bg-brand-pink p-7 text-brand-ink sm:rounded-tr-[4rem] sm:p-8"
    >
      <h3 className="text-3xl font-bold leading-tight tracking-tight">{audience.title}</h3>

      <span className="mt-2 text-xs font-bold uppercase tracking-wide text-white">{audience.eyebrow}</span>

      <div className="mt-5 space-y-4 text-sm leading-relaxed">
        {audience.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-auto flex justify-end pt-6">
        <Link
          href={`/who-we-support/${audience.slug}`}
          aria-label={`Explore support for ${audience.title}`}
          className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-ink transition hover:bg-brand-ink hover:text-white"
        >
          Explore →
        </Link>
      </div>
    </Tilt>
  );
}
