import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhyChooseUs() {
  return (
    <section className="relative z-20 mx-auto w-[90%] max-w-5xl py-14 text-center sm:py-16">
      <div className="flex flex-col gap-6 text-left sm:flex-row sm:items-center sm:gap-0">
        <div className="sm:w-1/2 sm:pr-10">
          <span className="text-xs font-bold uppercase tracking-wide text-white sm:text-lg">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Structured For Impact, Built With Care
          </h2>
        </div>

        <div className="border-l-[3px] border-brand-orange py-2 pl-5 sm:w-1/2 sm:pl-10">
          <p className="text-sm leading-relaxed text-white sm:text-lg">
            We don&apos;t simply deliver education. We build confidence, create positive
            relationships, support independence and prepare learners for successful futures
            through structured, personalised programmes.
          </p>
        </div>
      </div>

      <Button asChild variant="orange" size="pill" className="mt-10">
        <Link href="#our-services">Explore Our Services</Link>
      </Button>
    </section>
  );
}
