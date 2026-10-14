import Image from 'next/image';
import { Award, FileBadge, UserStar } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import type { AboutContent } from '@/lib/content/pages';

// Icons for mission, vision and values, in order.
const ICONS = [FileBadge, UserStar, Award];

/**
 * Orange card from the design. From lg up, sizes are design pixels (u-* units):
 * the card is 1520 wide, with labels ending 61 left of a divider at x 753 and
 * the copy starting 52 to its right.
 */
export function WhyWeExist({ content }: { content: AboutContent['whyWeExist'] }) {
  return (
    <section className="mx-auto w-[90%] max-w-6xl pb-16 sm:pb-20 lg:max-w-none lg:u-w-1520 lg:pb-0">
      <Reveal className="relative rounded-tr-[3rem] bg-brand-orange px-6 pt-12 pb-10 sm:rounded-tr-[5rem] sm:px-14 sm:pt-14 lg:u-rounded-tr-85 lg:px-0 lg:u-pt-54 lg:u-pb-93">
        <h2 className="text-center text-2xl font-bold text-white sm:text-4xl lg:u-text-50 lg:leading-[1.2]">{content.title}</h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white sm:text-base lg:max-w-none lg:u-max-w-1330 lg:u-mt-24 lg:u-text-24 lg:leading-[1.3]">
          {content.body}
        </p>

        <div className="relative mt-10 lg:u-mt-90">
          {/* One divider through all three rows on desktop */}
          <span
            aria-hidden="true"
            className="absolute hidden bg-white lg:block lg:left-[calc(var(--u)*753)] lg:-u-top-17 lg:-u-bottom-46 lg:u-w-4"
          />
          <Stagger as="ul" stagger={0.15} className="space-y-8 lg:space-y-0">
            {content.items.map(({ label, copy }, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <StaggerItem
                  as="li"
                  from="right"
                  key={`${i}-${label}`}
                  className="grid gap-3 text-white sm:grid-cols-[15rem_1fr] sm:gap-0 lg:grid-cols-[calc(var(--u)*753)_1fr] lg:items-center lg:[&:not(:first-child)]:u-mt-78"
                >
                  <span className="flex items-center gap-3 whitespace-nowrap sm:justify-end sm:pr-9 lg:justify-between lg:gap-0 lg:u-pl-367 lg:u-pr-61">
                    <Icon className="h-8 w-8 shrink-0 stroke-[1.5] lg:u-h-62 lg:u-w-62" aria-hidden="true" />
                    <span className="text-lg font-bold sm:text-2xl lg:u-text-40">{label}</span>
                  </span>
                  <p className="text-sm leading-relaxed sm:border-l-[3px] sm:border-white sm:pl-9 sm:text-base lg:border-l-0 lg:u-w-646 lg:u-pl-56 lg:u-text-24 lg:leading-[1.3]">
                    {copy}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Cut-out photo, anchored to the bottom-left and bleeding just past the card */}
        <Reveal from="up" delay={0.3} className="absolute hidden lg:block lg:-u-left-53 lg:-u-bottom-10 lg:u-w-415">
          <Image
            src="/images/girl-arms-crossed.webp"
            alt="Smiling girl with her arms crossed"
            width={955}
            height={1420}
            sizes="(min-width: 1024px) 22vw, 0px"
            className="h-auto w-full"
          />
        </Reveal>
      </Reveal>
    </section>
  );
}
