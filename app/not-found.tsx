import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroShapes } from '@/components/detail/Shapes';
import { REFERRAL_HREF, SITE_CONFIG } from '@/constants';

export const metadata: Metadata = {
  title: 'Page not found',
};

const PATHWAYS = [
  { href: '/services', label: 'Our Services' },
  { href: '/who-we-support', label: 'Who We Support' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-green px-6 py-20 text-center text-white">
      <HeroShapes variant="service" accent="pink" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <Link href="/" aria-label="Muve Futures home">
          <Image src="/logo.svg" width={281} height={135} alt="Muve Futures" className="h-auto w-48" priority />
        </Link>

        <p className="mt-10 inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-wide sm:text-lg">
          Page not found
        </p>

        <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
          Let&apos;s Get You Back On Track
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-relaxed sm:text-lg">
          The page you&apos;re looking for may have moved. These links will help you find the right
          information.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {PATHWAYS.map(({ href, label }) => (
            <li key={href}>
              <Button asChild variant="outline-white" size="pill" className="border-[3px] py-2">
                <Link href={href}>{label}</Link>
              </Button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="orange" size="pill">
            <Link href="/">Back to the homepage</Link>
          </Button>
          <Button asChild variant="orange" size="pill">
            <Link href={REFERRAL_HREF}>Make a Referral</Link>
          </Button>
        </div>

        <p className="mt-10 text-sm">
          Need to talk to someone? Call{' '}
          <a href={`tel:${SITE_CONFIG.contact.phoneFormatted.replace(/\s/g, '')}`} className="font-bold underline">
            {SITE_CONFIG.contact.phone}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
