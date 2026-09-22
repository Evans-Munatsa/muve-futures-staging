import Image from 'next/image';
import { Award, Crown, ScrollText } from 'lucide-react';
import { Hop } from '@/components/motion/Hop';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const PILLARS = [
  {
    icon: ScrollText,
    label: 'Our Mission',
    copy: 'To create personalised education pathways that help every learner engage, progress and prepare for a positive future through flexible, relationship-based education.',
  },
  {
    icon: Crown,
    label: 'Our Vision',
    copy: "To become one of the UK's most trusted Alternative Provision partners by delivering personalised education that improves outcomes for learners, schools, families and communities.",
  },
  {
    icon: Award,
    label: 'Our Values',
    copy: 'We are Personalised in our approach, Relationship Based in our practice, Flexible in our delivery and Outcome Focused in everything we do. These principles guide every decision we make.',
  },
];

export function WhyWeExist() {
  return (
    <section className="mx-auto w-[90%] max-w-6xl pb-16 sm:pb-20">
      <Reveal className="relative rounded-tr-[3rem] bg-brand-orange px-6 pt-12 pb-10 sm:rounded-tr-[5rem] sm:px-14 sm:pt-14 lg:pb-12">
        <h2 className="text-center text-2xl font-bold text-white sm:text-4xl">Why We Exist</h2>

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white sm:text-base">
          MUVE Futures was created to provide meaningful education opportunities for children and
          young people who require a different pathway through learning. We believe Alternative
          Provision should create opportunities, not limitations, and every programme should be
          designed with the learner&apos;s future in mind.
        </p>

        <div className="mt-10 lg:ml-[22%]">
          <Stagger as="ul" stagger={0.15} className="space-y-8 lg:space-y-12">
            {PILLARS.map(({ icon: Icon, label, copy }) => (
              <StaggerItem as="li" from="right" key={label} className="grid gap-3 text-white sm:grid-cols-[15rem_1fr] sm:gap-0">
                <span className="flex items-center gap-3 whitespace-nowrap sm:justify-end sm:pr-9">
                  <Icon className="h-8 w-8 shrink-0 stroke-[1.5]" aria-hidden="true" />
                  <span className="text-lg font-bold sm:text-2xl">{label}</span>
                </span>
                <p className="text-sm leading-relaxed sm:border-l-[3px] sm:border-white sm:pl-9 sm:text-base">
                  {copy}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Cut-out photo, anchored to the bottom-left and bleeding just past the card */}
        <Reveal from="up" delay={0.3} className="absolute -bottom-1 left-[-2%] hidden w-[26%] lg:block">
          <Hop height={18}>
            <Image
              src="/images/girl-arms-crossed.webp"
              alt="Smiling girl with her arms crossed"
              width={955}
              height={1420}
              sizes="(min-width: 1024px) 26vw, 0px"
              className="h-auto w-full"
            />
          </Hop>
        </Reveal>
      </Reveal>
    </section>
  );
}
