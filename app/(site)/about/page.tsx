import type { Metadata } from 'next';
import { ReferralButton } from '@/components/common/ActionButtons';
import { homeButton, homeType } from '@/components/home/homeStyles';
import { AboutHero } from '@/components/about/AboutHero';
import { WhyWeExist } from '@/components/about/WhyWeExist';
import { WhyChooseUs } from '@/components/about/WhyChooseUs';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import { getSingle } from '@/lib/content/queries';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'MUVE Futures provides personalised education that helps children and young people reconnect with learning, build confidence and prepare for positive futures.',
};

/** From lg up, sizes are design pixels (u-* units); the intro and cards share a divider line at x 953. */
export default async function AboutPage() {
  const content = await getSingle('about');
  return (
    <div className="w-full bg-brand-green">
      <AboutHero content={content.hero} />

      <section className="mx-auto w-[90%] max-w-6xl py-12 sm:py-16 lg:max-w-none lg:u-w-1920 lg:u-pt-50 lg:u-pb-89">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-0">
          <Reveal from="left" className="sm:w-1/2 lg:u-w-953 lg:shrink-0">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:pr-10 sm:text-right sm:text-5xl lg:u-pr-61 lg:u-text-52 lg:leading-[1.2]">
              <Lines text={content.intro.title} />
            </h2>
          </Reveal>

          <Reveal from="right" className="border-l-[3px] border-brand-orange pl-5 sm:w-1/2 sm:pl-9 lg:w-auto lg:border-l-[calc(var(--u)*4)] lg:u-pl-52">
            <p className="whitespace-pre-line text-sm leading-relaxed text-white sm:text-lg lg:u-w-608 lg:u-text-24 lg:leading-[1.3]">
              {content.intro.body}
            </p>
          </Reveal>
        </div>
      </section>

      <WhyWeExist content={content.whyWeExist} />

      <WhyChooseUs content={content.whyChooseUs} />

      <section className="mx-auto w-[90%] max-w-6xl pb-16 sm:pb-24 lg:max-w-none lg:u-w-1520 lg:pb-0">
        <Reveal className="rounded-tr-[3rem] bg-brand-pink px-6 py-14 text-center sm:rounded-tr-[5rem] sm:px-14 sm:py-16 lg:u-rounded-tr-85 lg:px-0 lg:u-pt-60 lg:u-pb-67">
          <h2 className={cn(homeType.heading, 'text-2xl text-white sm:text-4xl')}>
            <Lines text={content.closing.title} />
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white sm:text-lg lg:max-w-none lg:u-max-w-1170 lg:u-mt-33 lg:u-text-24 lg:leading-[1.3]">
            {content.closing.body}
          </p>

          <ReferralButton id="cta-btn-referral" className={cn('mt-8 lg:u-mt-47', homeButton.solid)}>
            {content.closing.cta}
          </ReferralButton>
        </Reveal>
      </section>
    </div>
  );
}
