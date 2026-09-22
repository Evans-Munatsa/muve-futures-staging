'use client';

import React, { useState } from 'react';
import {
  Search,
  ScrollText,
  Crown,
  Award,
//   Linkedin,
//   Instagram,
//   Facebook,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* Brand colours
   green  #A5CD39   orange #F05A28
   navy   #092233   pink   #EE8FC0 */

const outlineButtonLight =
  'h-auto rounded-full border-2 border-white bg-transparent px-6 py-2.5 ' +
  'text-sm font-bold text-white shadow-none transition-colors hover:bg-white hover:text-[#092233]';

const orangeButton =
  'h-auto rounded-full bg-[#F05A28] px-7 py-3 text-sm font-bold text-white ' +
  'shadow-none transition-colors hover:bg-[#d94e20]';

export default function AboutPage() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send `email` to your mailing list / API route here
  };

  return (
    <main className="w-full bg-[#A5CD39]">

      {/* ───────────────────── Hero ───────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] max-h-[45rem] w-full sm:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/background.svg"
            alt="A boy and a mother playing and drawing together in a bright playroom"
            className="h-full w-full object-cover"
          />
          {/* green tint over the photo */}
          <div className="absolute inset-0 bg-[#A5CD39]/55" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              More Than Alternative Provision
            </h1>

            <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed sm:text-base">
              MUVE Futures provides personalised education that helps children and
              young people reconnect with learning, build confidence and prepare
              for positive futures. We believe education should adapt to the
              learner, not the learner to education.
            </p>

            <Button id="hero-btn-book-intro" className={`${orangeButton} mt-7`}>
              Book an Intro
            </Button>
          </div>
        </div>
      </section>

      {/* ───────────────────── Education built around the individual ───────────────────── */}
      <section className="mx-auto w-[90%] max-w-6xl py-16 sm:py-24">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-14">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:w-[44%] sm:text-4xl">
            Education Built Around The Individual
          </h2>

          <div className="border-l-4 border-[#F05A28] pl-5 sm:w-[52%]">
            <p className="text-sm leading-relaxed text-white sm:text-base">
              Every child deserves an education that recognises their strengths,
              understands their challenges and provides the support they need to
              succeed. Our personalised approach focuses on the whole learner, not
              simply the barriers they face.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────── Why We Exist ───────────────────── */}
      <section className="mx-auto w-[90%] max-w-6xl pb-16 sm:pb-24">
        <div className="rounded-[2.5rem] rounded-tr-[5rem] bg-[#F05A28] px-6 py-12 sm:rounded-tr-[7rem] sm:px-14 sm:py-16">
          <h2 className="text-center text-2xl font-extrabold text-white sm:text-4xl">
            Why We Exist
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-white/95 sm:text-base">
            MUVE Futures was created to provide meaningful education opportunities
            for children and young people who require a different pathway through
            learning. We believe Alternative Provision should create
            opportunities, not limitations, and every programme should be designed
            with the learner's future in mind.
          </p>

          <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-stretch sm:gap-10">
            {/* portrait */}
            <div className="mx-auto w-[60%] max-w-xs sm:mx-0 sm:w-[26%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/girl.svg"
                alt="Smiling girl with her arms crossed"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

            {/* labels */}
            <div className="flex flex-row justify-around gap-4 sm:w-[26%] sm:flex-col sm:justify-center sm:gap-10">
              <div className="flex items-center gap-3 text-white">
                <ScrollText className="h-6 w-6 shrink-0" />
                <span className="text-sm font-bold sm:text-lg">Our Mission</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Crown className="h-6 w-6 shrink-0" />
                <span className="text-sm font-bold sm:text-lg">Our Vision</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Award className="h-6 w-6 shrink-0" />
                <span className="text-sm font-bold sm:text-lg">Our Values</span>
              </div>
            </div>

            {/* copy, separated by a vertical divider on larger screens */}
            <div className="flex flex-col gap-8 border-white/60 text-sm leading-relaxed text-white/95 sm:w-[48%] sm:border-l sm:pl-10 sm:text-base">
              <p>
                To create personalised education pathways that help every learner
                engage, progress and prepare for a positive future through
                flexible, relationship-based education.
              </p>
              <p>
                To become one of the UK's most trusted Alternative Provision
                partners by delivering personalised education that improves
                outcomes for learners, schools, families and communities.
              </p>
              <p>
                We are Personalised in our approach, Relationship Based in our
                practice, Flexible in our delivery and Outcome Focused in
                everything we do. These principles guide every decision we make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Why Choose Us ───────────────────── */}
      <section className="relative mx-auto w-[90%] max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-start">
          <div className="sm:w-[55%]">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white sm:text-sm">
              The Difference
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#092233] sm:text-5xl">
              Why Choose Us?
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#092233] sm:text-base">
              We look beyond labels and diagnoses to understand every learner as
              an individual. By working collaboratively with schools, families and
              professionals, we create education pathways that are meaningful,
              flexible and focused on long-term success.
            </p>

            <Button
              id="btn-discover-approach"
              variant="outline"
              className={`${outlineButtonLight} mt-6`}
            >
              Discover Our Approach
            </Button>
          </div>

          <div className="relative mt-8 w-[70%] self-end sm:mt-0 sm:w-[42%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/boy.svg"
              alt="Smiling boy resting his chin on his hand"
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── CTA banner ───────────────────── */}
      <section className="mx-auto w-[90%] max-w-6xl pb-16 sm:pb-24">
        <div className="rounded-[2.5rem] rounded-tr-[5rem] bg-[#EE8FC0] px-6 py-14 text-center sm:rounded-tr-[7rem] sm:px-14 sm:py-20">
          <h2 className="text-2xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Let's Build Better Futures Together
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/95 sm:text-base">
            Whether you're looking for Alternative Provision, exploring
            partnership opportunities or seeking advice about a learner, we'd
            love to hear from you.
          </p>

          <Button id="cta-btn-book-intro" className={`${orangeButton} mt-7`}>
            Book an Intro
          </Button>
        </div>
      </section>

    </main>
  );
}
