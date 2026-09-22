'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, Mail, Phone, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/constants';

export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // TODO: forward to an error reporting service.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center bg-brand-green py-20 text-brand-ink sm:py-24">
      <div className="mx-auto w-[90%] max-w-3xl">
        <div className="relative overflow-hidden rounded-tr-[3rem] bg-white p-8 text-center sm:rounded-tr-[5rem] sm:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-white">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </div>

          <span className="mb-4 inline-block rounded-full border-[3px] border-brand-orange px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-orange">
            Temporary Service Interruption
          </span>

          <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-4xl">We&apos;re Working to Resolve This</h1>

          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed sm:text-base">
            An unexpected error occurred while loading this section. Scheduled learner sessions and
            our phone lines are completely unaffected.
          </p>

          <div className="mx-auto mb-8 max-w-xl rounded-tl-[2rem] bg-brand-lime p-5 text-left sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" aria-hidden="true" />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider mb-1">
                  Urgent Safeguarding &amp; Placement Support
                </h2>
                <p className="mb-3 text-xs leading-relaxed">
                  If you have an urgent safeguarding concern or need to confirm student arrival, our
                  central duty operations desk remains live:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 font-bold hover:text-brand-green"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-orange" aria-hidden="true" />
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="inline-flex items-center gap-1.5 font-bold hover:text-brand-green"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-green" aria-hidden="true" />
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="orange" size="pill" onClick={retry}>
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              Try Again
            </Button>
            <Button asChild variant="navy" size="pill">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
