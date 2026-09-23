import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { ResourcesContent } from '@/lib/content/pages';

/** Full-width books photo under a green wash, with the page heading over it. */
export function ResourcesHero({ content }: { content: ResourcesContent['hero'] }) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative flex min-h-[32rem] w-full items-center justify-center sm:aspect-[1920/767] sm:min-h-0 sm:max-h-[48rem]">
        <Reveal onLoad from="fade" className="absolute inset-0">
          <Image
            src="/images/resources-books.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
        {/* green wash over the photo, blending into the page colour at both edges */}
        <div className="absolute inset-0 bg-brand-green/50" />
        <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-t from-transparent to-brand-green" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-brand-green" />

        <Stagger
          onLoad
          stagger={0.18}
          delay={0.2}
          className="relative z-10 flex flex-col items-center px-6 py-16 text-center text-white"
        >
          <StaggerItem>
            <h1 className="max-w-6xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-7xl">
              <Lines text={content.title} />
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed sm:text-base lg:text-lg">{content.intro}</p>
          </StaggerItem>

          <StaggerItem from="pop">
            <Button asChild variant="orange" size="pill" className="mt-8 text-base">
              <Link href="#resource-library">{content.cta}</Link>
            </Button>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
