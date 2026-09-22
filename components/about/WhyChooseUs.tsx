import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhyChooseUs() {
  return (
    <section className="relative mx-auto w-[90%] max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-end">
        <div className="pb-10 sm:w-[58%] sm:pb-12 sm:pl-[5%]">
          <span className="text-xs font-bold uppercase tracking-wider text-white sm:text-lg">
            The Difference
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-6xl">
            Why Choose Us?
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-brand-ink sm:text-lg">
            We look beyond labels and diagnoses to understand every learner as an individual. By
            working collaboratively with schools, families and professionals, we create education
            pathways that are meaningful, flexible and focused on long-term success.
          </p>

          <Button asChild variant="outline-white" size="pill" className="mt-8 border-[3px] py-2.5">
            <Link id="btn-discover-approach" href="/#framework">
              Discover Our Approach
            </Link>
          </Button>
        </div>

        {/* Cut-out photo that stands on the pink CTA card below */}
        <div className="relative mx-auto w-[60%] sm:mx-0 sm:ml-auto sm:mr-[7%] sm:w-[28%]">
          <Image
            src="/images/boy-thinking.webp"
            alt="Smiling boy resting his chin on his hand"
            width={1356}
            height={1626}
            sizes="(min-width: 640px) 28vw, 60vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
