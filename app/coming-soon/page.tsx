"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { REFERRAL_HREF } from '@/constants';

const GREEN = '#A5CD39';
const ORANGE = '#F05B25';
const PINK = '#EC83B5';
const BLUE = '#99D9E5';
const CORAL = '#F75658';

/* Background shapes, drawn on the same 1920x1080 grid as the design */
const Shapes = () => (
  <svg
    className="absolute inset-0 h-full w-full"
    viewBox="0 0 1920 1080"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {/* top-left */}
    <circle cx="-22" cy="95" r="175" fill={BLUE} />
    <polygon points="175,310 130,399 229,394" fill="#fff" />

    {/* top-right */}
    <circle cx="1760" cy="60" r="172" fill={PINK} />
    <polygon points="1787,173 1742,262 1841,258" fill="#fff" />

    {/* bottom-left */}
    <circle cx="270" cy="1082" r="307" fill={ORANGE} />
    <polygon points="240,727 375,691 338,827" fill={PINK} />

    {/* bottom-right */}
    <circle cx="1990" cy="770" r="225" fill="#fff" />
    <polygon points="1565,698 1881,780 1652,1012" fill={BLUE} />
  </svg>
);

const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#A5CD39]"
  >
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke={GREEN}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </a>
);

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your mailing list / API route here
    setSubscribed(true);
  };

  return (
    <main
      className={`font-lexend-deca relative flex min-h-screen w-full flex-col items-center overflow-hidden px-6 pb-8 pt-[8vh] text-white`}
      style={{ backgroundColor: GREEN }}
    >
      <Shapes />

      <div className="relative z-10 flex w-full flex-col items-center">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="Muve Futures Alternative Provision"
          className="h-auto w-[clamp(260px,29.2vw,560px)]"
        />

        {/* Heading */}
        <h1 className="mt-[clamp(48px,9.5vh,105px)] text-center text-[clamp(1.9rem,3.4vw,4rem)] font-bold leading-tight">
          Website Launching Soon
        </h1>

        {/* Email form */}
        <form
          onSubmit={handleSubmit}
          className="relative mt-[clamp(20px,3.4vh,40px)] h-[50px] w-[min(598px,90vw)]"
        >
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-full w-full rounded-full bg-white pl-6 pr-36 text-[17px] font-semibold text-[#333] placeholder:text-[#BDBDBD] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#A5CD39]"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full rounded-full px-[18px] text-[17px] font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ backgroundColor: CORAL }}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>

        {/* Social icons */}
        <div className="mt-[clamp(28px,5vh,55px)] flex items-center gap-[18px]">
          <SocialLink href="https://www.linkedin.com" label="LinkedIn">
            <path
              d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"
              fill={GREEN}
              stroke="none"
            />
          </SocialLink>

          <SocialLink href="https://www.instagram.com" label="Instagram">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.6" fill={GREEN} />
          </SocialLink>

          <SocialLink href="https://www.facebook.com" label="Facebook">
            <path d="M14 8h2.5V4.5H14C11.5 4.5 10 6.2 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16L16.5 11h-3V8.8c0-.5.3-.8.5-.8z" fill={GREEN} stroke="none" />
          </SocialLink>
        </div>

        {/* Buttons */}
        <div className="mt-[clamp(32px,8.5vh,92px)] flex flex-wrap items-center justify-center gap-[15px]">
          <a
            href="/prospectus.pdf"
            className="rounded-full border-[3px] px-[22px] py-[9px] text-[clamp(1rem,1.4vw,1.6rem)] font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#A5CD39]"
            style={{ backgroundColor: ORANGE, borderColor: ORANGE }}
          >
            View Our Prospectus
          </a>
          <Link
            href={REFERRAL_HREF}
            className="rounded-full border-[3px] px-[22px] py-[9px] text-[clamp(1rem,1.4vw,1.6rem)] font-bold transition-colors hover:bg-brand-orange hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#A5CD39]"
            style={{ color: ORANGE, borderColor: ORANGE }}
          >
            Make a Referral
          </Link>
        </div>
      </div>
    </main>
  );
}
