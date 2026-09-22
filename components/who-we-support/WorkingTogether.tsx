import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hop } from '@/components/motion/Hop';
import { Reveal } from '@/components/motion/Reveal';

export function WorkingTogether() {
  return (
    <section className="relative z-20 mx-auto w-[90%] max-w-6xl pt-4 sm:pt-0">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end">
        {/* Cut-out photo, bottom-aligned with the copy column */}
        <Reveal from="up" className="w-3/5 max-w-sm shrink-0 sm:w-[31%]">
          <Hop height={18}>
            <Image
              src="/images/girl-backpack.webp"
              alt="Smiling girl with a backpack holding a green folder"
              width={1180}
              height={1965}
              sizes="(min-width: 640px) 31vw, 60vw"
              className="h-auto w-full"
            />
          </Hop>
        </Reveal>

        <Reveal from="right" delay={0.15} className="border-l-[3px] border-brand-orange pl-6 sm:ml-[3%] sm:mb-0 sm:w-[60%] sm:pl-12">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Working together around
            <br />
            every learner
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-white sm:text-lg">
            The best outcomes happen when the people supporting a learner share information,
            understand their responsibilities and work towards the same goals.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white sm:text-lg">
            We create personalised education pathways with clear outcomes, regular communication
            and joined-up planning. This helps everyone involved understand the programme, follow
            progress and contribute to the learner&apos;s next steps.
          </p>

          <Button asChild variant="orange" size="pill" className="mt-8">
            <Link href="/services">Explore Our Services</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
