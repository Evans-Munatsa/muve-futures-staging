import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { AboutContent } from '@/lib/content/pages';

export function WhyChooseUs({ content }: { content: AboutContent['whyChooseUs'] }) {
  return (
    <section className="relative mx-auto w-[90%] max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end">
        <Reveal from="left" className="pb-10 sm:w-[58%] sm:pb-12 sm:pl-[5%]">
          <span className="text-xs font-bold uppercase tracking-wider text-white sm:text-lg">
            {content.eyebrow}
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-6xl">
            <Lines text={content.title} />
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-brand-ink sm:text-lg">
            {content.body}
          </p>

          <Button asChild variant="outline-white" size="pill" className="mt-8 border-[3px] py-2.5">
            <Link id="btn-discover-approach" href="/#framework">
              {content.cta}
            </Link>
          </Button>
        </Reveal>

        {/* Cut-out photo that stands on the pink CTA card below */}
        <Reveal from="up" delay={0.2} className="relative mx-auto w-[60%] sm:mx-0 sm:ml-auto sm:mr-[7%] sm:w-[28%]">
          <Image
            src="/images/boy-thinking.webp"
            alt="Smiling boy resting his chin on his hand"
            width={1356}
            height={1626}
            sizes="(min-width: 640px) 28vw, 60vw"
            className="h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
