import type { Metadata } from 'next';
import { BookIntroButton } from '@/components/common/ActionButtons';
import { AboutHero } from '@/components/about/AboutHero';
import { WhyWeExist } from '@/components/about/WhyWeExist';
import { WhyChooseUs } from '@/components/about/WhyChooseUs';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import { getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'MUVE Futures provides personalised education that helps children and young people reconnect with learning, build confidence and prepare for positive futures.',
};

export default async function AboutPage() {
  const content = await getSingle('about');
  return (
    <div className="w-full bg-brand-green">
      <AboutHero content={content.hero} />

      <section className="mx-auto w-[90%] max-w-6xl py-12 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-0">
          <Reveal from="left" className="sm:w-1/2">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:pr-10 sm:text-right sm:text-5xl">
              <Lines text={content.intro.title} />
            </h2>
          </Reveal>

          <Reveal from="right" className="border-l-[3px] border-brand-orange pl-5 sm:w-1/2 sm:pl-9">
            <p className="text-sm leading-relaxed text-white sm:text-lg">
              {content.intro.body}
            </p>
          </Reveal>
        </div>
      </section>

      <WhyWeExist content={content.whyWeExist} />

      <WhyChooseUs content={content.whyChooseUs} />

      <section className="mx-auto w-[90%] max-w-6xl pb-16 sm:pb-24">
        <Reveal className="rounded-tr-[3rem] bg-brand-pink px-6 py-14 text-center sm:rounded-tr-[5rem] sm:px-14 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-6xl">
            <Lines text={content.closing.title} />
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white sm:text-lg">
            {content.closing.body}
          </p>

          <BookIntroButton id="cta-btn-book-intro" className="mt-8">
            {content.closing.cta}
          </BookIntroButton>
        </Reveal>
      </section>
    </div>
  );
}
