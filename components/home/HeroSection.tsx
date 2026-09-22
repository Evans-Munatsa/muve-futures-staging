import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ReferralButton } from '@/components/common/ActionButtons';
import { homeButton } from '@/components/home/homeStyles';

/*
 * From `lg` up this section reproduces the design frame 1:1 using design units
 * (u-*, see app/globals.css). The SVG layers use the frame's own coordinates:
 * the hero spans y 305–1464 of the Home frame, so y here = frame y − 305.
 */
export function HeroSection({ onLearnMore }: { onLearnMore: () => void }) {
  return (
    <section id="hero" className="relative bg-brand-green lg:u-h-1159">
      {/* Pink circle, behind the photo */}
      <svg className="absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 1920 1159" aria-hidden="true">
        <circle cx="69.5" cy="332.5" r="332.5" fill="#EC83B5" />
      </svg>

      {/* Photo: fills the frame on desktop, a banner above the copy on mobile */}
      <div className="relative aspect-[1920/1159] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src="/images/home/hero.webp"
          alt="Smiling boy with Down syndrome leaning on an art table, drawing with crayons"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Shapes in front of the photo */}
      <svg className="absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 1920 1159" aria-hidden="true">
        <circle cx="1756" cy="1061" r="230" fill="#99D9E5" />
        <polygon points="1970.7,23.2 1788.5,224.8 1705,-33.8" fill="#EC83B5" />
        <polygon points="1620.3,921.2 1520.2,926.2 1566,837.1" fill="#F05B25" />
        <polygon points="146.2,599.8 67.8,537.5 160.9,500.7" fill="#fff" />
        <polygon points="1683.8,560.6 1712.8,464.7 1781.4,537.7" fill="#fff" />
      </svg>

      <div className="relative z-10 px-6 py-10 text-center text-white lg:absolute lg:u-left-636 lg:u-top-46 lg:u-w-1100 lg:p-0">
        <h1 className="text-3xl font-bold leading-[1.24] tracking-[-0.02em] sm:text-5xl lg:u-text-93">
          Education That Starts With Understanding
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.33] sm:text-base lg:u-mt-64 lg:u-max-w-906 lg:u-text-24">
          Personalised Alternative Provision for young people aged 4–25 with SEND, SEMH, EBSNA or
          other barriers to learning. We create flexible programmes that rebuild confidence,
          reconnect learners with education and prepare them for what comes next.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3 lg:u-mt-63 lg:u-gap-30">
          <Button id="hero-btn-learn-more" variant="orange" onClick={onLearnMore} className={homeButton.solid}>
            Learn More
          </Button>
          <ReferralButton id="hero-btn-referral" variant="outline-white" className={homeButton.outline}>
            Make a Referral
          </ReferralButton>
        </div>
      </div>
    </section>
  );
}
