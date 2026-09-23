import Image from 'next/image';
import { BookIntroButton } from '@/components/common/ActionButtons';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { AboutContent } from '@/lib/content/pages';

export function AboutHero({ content }: { content: AboutContent['hero'] }) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/3] max-h-[48rem] w-full sm:aspect-[1920/767]">
        <Reveal onLoad from="fade" className="absolute inset-0">
          <Image
            src="/images/about-hero.webp"
            alt="A boy and a teacher sitting on a play mat, working through a learning activity together"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
        {/* green wash over the photo, fading fully to the page colour at the bottom edge */}
        <div className="absolute inset-0 bg-brand-green/45" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-brand-green" />

        <Stagger
          onLoad
          stagger={0.18}
          delay={0.2}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
        >
          <StaggerItem>
            <h1 className="max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-7xl">
              <Lines text={content.title} breakClassName='' />
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed sm:text-base lg:text-lg">
              {content.intro}
            </p>
          </StaggerItem>

          <StaggerItem from="pop">
            <BookIntroButton id="hero-btn-book-intro" className="mt-8">
              {content.cta}
            </BookIntroButton>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
