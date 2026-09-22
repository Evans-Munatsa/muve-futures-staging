import Image from 'next/image';
import { BookIntroButton } from '@/components/common/ActionButtons';

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/3] max-h-[48rem] w-full sm:aspect-[1920/767]">
        <Image
          src="/images/about-hero.webp"
          alt="A boy and a teacher sitting on a play mat, working through a learning activity together"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* green wash over the photo, fading fully to the page colour at the bottom edge */}
        <div className="absolute inset-0 bg-brand-green/45" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-brand-green" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-7xl">
            More Than
            <br />
            Alternative Provision
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed sm:text-base lg:text-lg">
            MUVE Futures provides personalised education that helps children and young people
            reconnect with learning, build confidence and prepare for positive futures. We believe
            education should adapt to the learner, not the learner to education.
          </p>

          <BookIntroButton id="hero-btn-book-intro" className="mt-8">
            Book an Intro
          </BookIntroButton>
        </div>
      </div>
    </section>
  );
}
