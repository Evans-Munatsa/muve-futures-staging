'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/common/SocialLinks';
import { LEGAL_LINKS } from '@/constants';

const SUBSCRIBED_RESET_MS = 4000;

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!subscribed) return;
    const timeout = setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, SUBSCRIBED_RESET_MS);
    return () => clearTimeout(timeout);
  }, [subscribed]);

  const handleSubscribe = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send `email` to the mailing list provider.
    setSubscribed(true);
  };

  return (
    // From `lg` up, positions are design units measured from the frames' footer (456 tall).
    <footer id="footer-section" className="relative bg-brand-green pt-16 pb-16 text-white sm:pt-20 sm:pb-24 lg:mx-auto lg:u-h-456 lg:u-w-1920 lg:p-0">
      <div className="mx-auto w-[90%] max-w-5xl lg:contents">
        <div className="grid grid-cols-1 items-start gap-10 text-sm md:grid-cols-[1fr_auto_1fr] lg:contents">
          {/* Newsletter & office address */}
          <div className="flex flex-col items-center md:items-start lg:contents">
            <form onSubmit={handleSubscribe} className="w-full max-w-[22rem] lg:absolute lg:u-left-267 lg:u-top-123 lg:u-w-375 lg:max-w-none">
              <div className="flex h-10 items-center rounded-full bg-white lg:u-h-42 lg:u-w-322">
                <label htmlFor="footer-email-input" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-full min-w-0 flex-1 rounded-full bg-transparent px-5 text-sm font-semibold text-brand-ink placeholder:text-[#C1C1C1] focus:outline-hidden lg:u-pl-21 lg:u-pr-60 lg:u-text-16"
                />
                <Button
                  id="footer-btn-subscribe"
                  type="submit"
                  variant="orange"
                  className="h-full shrink-0 px-5 text-sm lg:absolute lg:top-0 lg:right-0 lg:u-h-42 lg:u-w-107 lg:px-0 lg:u-text-16"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1">
                      <Check className="h-4 w-4" /> Done
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>
              {subscribed && (
                <p role="status" className="mt-2 text-xs font-semibold text-white">
                  Thank you for subscribing!
                </p>
              )}
            </form>

            <address className="mt-4 text-center not-italic leading-snug md:text-left lg:absolute lg:u-left-269 lg:u-top-188 lg:mt-0 lg:u-text-20 lg:leading-[1.2]">
              <p className="font-bold">UK Office</p>
              <p>Suite 1</p>
              <p>Aqueous II</p>
              <p>Rocky Lane</p>
              <p>Birmingham</p>
              <p>B6 5RQ</p>
            </address>
          </div>

          {/* Logo & copyright */}
          <div className="flex flex-col items-center text-center lg:absolute lg:inset-x-0 lg:u-top-104">
            <Link href="/" aria-label="Muve Futures home">
              <Image src="/logo.svg" width={281} height={135} alt="Muve Futures" className="h-auto w-44 lg:u-w-280" />
            </Link>
            <p className="mt-5 text-sm font-bold leading-snug lg:u-mt-34 lg:u-text-20 lg:leading-[1.25]">
              © {new Date().getFullYear()} Muve Futures
              <br />
              All Rights Reserved. Site by Marva Group.
            </p>
          </div>

          {/* Legal links & socials */}
          <div className="flex items-start justify-center gap-6 md:justify-end lg:contents">
            <nav aria-label="Legal" className="lg:absolute lg:u-left-1344 lg:u-top-168">
              <ul className="space-y-1 text-sm font-bold lg:space-y-0 lg:u-text-20 lg:leading-[1.6]">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.slug}>
                    <Link id={`link-${link.slug}`} href={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <SocialLinks
              className="flex-col gap-2 lg:absolute lg:u-left-1621 lg:u-top-177 lg:u-gap-18"
              linkClassName="lg:u-h-37 lg:u-w-37"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
