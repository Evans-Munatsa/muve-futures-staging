import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import { homeButton, homeType } from '@/components/home/homeStyles';
import { cn } from '@/lib/utils';
import type { AboutContent } from '@/lib/content/pages';

/** From lg up, sizes are design pixels (u-* units), inside the same 1520-wide column as the cards. */
export function WhyChooseUs({ content }: { content: AboutContent['whyChooseUs'] }) {
  return (
    <section className="relative mx-auto w-[90%] max-w-6xl lg:max-w-none lg:u-w-1520 lg:u-pt-57">
      <div className="flex flex-col sm:flex-row sm:items-end">
        <Reveal from="left" className="pb-10 sm:w-[58%] sm:pb-12 sm:pl-[5%] lg:w-auto lg:u-pb-75 lg:u-pl-79">
          <span className={cn(homeType.eyebrow, 'block text-white sm:text-lg')}>{content.eyebrow}</span>

          <h2 className={cn(homeType.heading, 'mt-2 text-white sm:text-6xl lg:u-mt-15')}>
            <Lines text={content.title} />
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-brand-ink sm:text-lg lg:max-w-none lg:u-w-800 lg:u-mt-15 lg:u-text-24 lg:leading-[1.3]">
            {content.body}
          </p>

          <Button asChild variant="outline-white" size="pill" className={cn(homeButton.outlineSm, 'mt-8 lg:u-mt-56 lg:u-w-354')}>
            <Link id="btn-discover-approach" href="/#framework">
              {content.cta}
            </Link>
          </Button>
        </Reveal>

        {/* Cut-out photo that stands on the pink CTA card below */}
        <Reveal from="up" delay={0.2} className="relative mx-auto w-[60%] sm:mx-0 sm:ml-auto sm:mr-[7%] sm:w-[28%] lg:u-mr-128 lg:u-w-434">
          <Image
            src="/images/boy-thinking.webp"
            alt="Smiling boy resting his chin on his hand"
            width={1356}
            height={1626}
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 28vw, 60vw"
            className="h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
