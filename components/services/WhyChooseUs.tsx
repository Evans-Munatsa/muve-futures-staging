import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { ServicesPageContent } from '@/lib/content/pages';

export function WhyChooseUs({ content }: { content: ServicesPageContent['whyChooseUs'] }) {
  return (
    <section className="relative z-20 mx-auto w-[90%] max-w-5xl py-14 text-center sm:py-16">
      <div className="flex flex-col gap-6 text-left sm:flex-row sm:items-center sm:gap-0">
        <Reveal from="left" className="sm:w-1/2 sm:pr-10">
          <span className="text-xs font-bold uppercase tracking-wide text-white sm:text-lg">
            {content.eyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            <Lines text={content.title} />
          </h2>
        </Reveal>

        <Reveal from="right" className="border-l-[3px] border-brand-orange py-2 pl-5 sm:w-1/2 sm:pl-10">
          <p className="text-sm leading-relaxed text-white sm:text-lg">
            {content.body}
          </p>
        </Reveal>
      </div>

      <Reveal from="pop" delay={0.2}>
        <Button asChild variant="orange" size="pill" className="mt-10">
          <Link href="#our-services">{content.cta}</Link>
        </Button>
      </Reveal>
    </section>
  );
}
