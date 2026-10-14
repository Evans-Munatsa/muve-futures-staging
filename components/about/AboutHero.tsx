import Image from 'next/image';
import { ReferralButton } from '@/components/common/ActionButtons';
import { homeButton } from '@/components/home/homeStyles';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { AboutContent } from '@/lib/content/pages';

export function AboutHero({ content }: { content: AboutContent['hero'] }) {
  return (
    <section className="relative w-full overflow-hidden lg:-u-mt-37">
      <div className="relative aspect-[4/3] max-h-[48rem] w-full sm:aspect-[1920/767]">
        <Reveal onLoad from="fade" className="absolute inset-0">
          <Image
            src="/images/about-hero-girls.webp"
            alt="Three smiling teenage girls outdoors with backpacks and books"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
        {/* As in the design: the page green fades in over the top and bottom edges, with only a light wash in the middle */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#A5CD39_0%,rgb(165_205_57/0.06)_39%,rgb(165_205_57/0.06)_50%,#A5CD39_100%)]" />

        <Stagger
          onLoad
          stagger={0.18}
          delay={0.2}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
        >
          <StaggerItem>
            <h1 className="max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:max-w-none lg:u-text-94 lg:leading-[1.17]">
              <Lines text={content.title} breakClassName='' />
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed sm:text-base lg:max-w-none lg:u-max-w-1040 lg:u-mt-36 lg:u-text-24 lg:leading-[1.3]">
              {content.intro}
            </p>
          </StaggerItem>

          <StaggerItem from="pop">
            <ReferralButton id="hero-btn-referral" className={`mt-8 lg:u-mt-70 ${homeButton.solid}`}>
              {content.cta}
            </ReferralButton>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
