import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tilt } from '@/components/motion/Tilt';
import { ServiceOffering } from '@/constants';

export function ServiceCard({ service }: { service: ServiceOffering }) {
  const Icon = service.icon;

  return (
    <Tilt
      as="article"
      max={6}
      id={`card-service-${service.slug}`}
      className="flex w-full flex-col rounded-tr-[3rem] bg-brand-lime p-7 text-brand-ink sm:rounded-tr-[4rem] sm:p-8"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-white">
        <Icon className="h-6 w-6 stroke-[1.5]" aria-hidden="true" />
      </span>

      <span className="mt-6 text-xs font-bold uppercase tracking-wide">{service.eyebrow}</span>

      <h3 className="mt-1 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{service.title}</h3>

      <p className="mt-3 text-base leading-relaxed">{service.description}</p>

      <ul className="mt-4 space-y-0.5 text-xs font-bold sm:text-sm">
        {service.points.map((point) => (
          <li key={point} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* mt-auto keeps the buttons aligned across cards with different copy lengths */}
      <div className="mt-auto pt-6">
        <Button asChild variant="orange" size="pill-sm">
          <Link href={`/services/${service.slug}`}>{service.linkLabel} →</Link>
        </Button>
      </div>
    </Tilt>
  );
}
