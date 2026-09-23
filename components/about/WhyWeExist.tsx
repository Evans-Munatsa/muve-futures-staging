import Image from 'next/image';
import { Award, Crown, ScrollText } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import type { AboutContent } from '@/lib/content/pages';

// Icons for mission, vision and values, in order.
const ICONS = [ScrollText, Crown, Award];

export function WhyWeExist({ content }: { content: AboutContent['whyWeExist'] }) {
  return (
    <section className="mx-auto w-[90%] max-w-6xl pb-16 sm:pb-20">
      <Reveal className="relative rounded-tr-[3rem] bg-brand-orange px-6 pt-12 pb-10 sm:rounded-tr-[5rem] sm:px-14 sm:pt-14 lg:pb-12">
        <h2 className="text-center text-2xl font-bold text-white sm:text-4xl">{content.title}</h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white sm:text-base">
          {content.body}
        </p>

        <div className="mt-10 lg:ml-[22%]">
          <Stagger as="ul" stagger={0.15} className="space-y-8 lg:space-y-12">
            {content.items.map(({ label, copy }, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
              <StaggerItem as="li" from="right" key={`${i}-${label}`} className="grid gap-3 text-white sm:grid-cols-[15rem_1fr] sm:gap-0">
                <span className="flex items-center gap-3 whitespace-nowrap sm:justify-end sm:pr-9">
                  <Icon className="h-8 w-8 shrink-0 stroke-[1.5]" aria-hidden="true" />
                  <span className="text-lg font-bold sm:text-2xl">{label}</span>
                </span>
                <p className="text-sm leading-relaxed sm:border-l-[3px] sm:border-white sm:pl-9 sm:text-base">
                  {copy}
                </p>
              </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Cut-out photo, anchored to the bottom-left and bleeding just past the card */}
        <Reveal from="up" delay={0.3} className="absolute -bottom-1 left-[-2%] hidden w-[26%] lg:block">
          <Image
            src="/images/girl-arms-crossed.webp"
            alt="Smiling girl with her arms crossed"
            width={955}
            height={1420}
            sizes="(min-width: 1024px) 26vw, 0px"
            className="h-auto w-full"
          />
        </Reveal>
      </Reveal>
    </section>
  );
}
