import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Check, Phone, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { PageId } from '@/app/types';
import { SITE_CONFIG } from '@/constants';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
  onOpenLegalModal: (title: string, content: string) => void;
  onOpenReferral?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalModal, onOpenReferral }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const handleLinkClick = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };



  return (
    <footer id="footer-section" className="bg-[#A5CD39] text-white pt-16 pb-12 border-t border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Middle: 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pt-2 text-sm">
          
          {/* Left Column: UK Headquarters */}
          <div className="text-center md:text-left space-y-2 text-white/90">
            <form onSubmit={handleSubscribe} className="w-full max-w-md pt-1">
              <div className="flex items-center bg-white rounded-full p-1 shadow-lg border border-white/30">
                <input
                  id="footer-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  className="flex-1 bg-transparent px-5 py-2 text-sm text-[#092233] placeholder-neutral-400 focus:outline-hidden rounded-full"
                />
                <Button
                  id="footer-btn-subscribe"
                  type="submit"
                  variant="coral"
                  size="sm"
                  className="shrink-0"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-4 h-4" /> Done
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </div>
              {subscribed && (
                <p className="text-center text-xs font-semibold text-white mt-2">
                  Thank you for subscribing to our education briefing!
                </p>
              )}
            </form>
            <p className="font-bold text-white text-base flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-4 h-4 text-white" />
              UK Regional Office
            </p>
            <p>Suite 1, Aqueous II</p>
            <p>Rocky Lane, Aston</p>
            <p>Birmingham, West Midlands</p>
            <p className="font-bold text-white">B6 5RQ</p>
            <div className="pt-2 text-xs text-white/90 space-y-1">
              <p className="flex items-center justify-center md:justify-start gap-1.5">
                <Phone className="w-3.5 h-3.5" /> 0121 405 9284
              </p>
              <p className="flex items-center justify-center md:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5" /> referrals@muvefutures.co.uk
              </p>
            </div>
          </div>

          {/* Center Column: Logo & Accreditation */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <a href="/">
              <img
                src="/logo.svg"
                width={180}
                height={80}
                alt="Muve Healthcare"
              />
            </a>
            <div className="text-xs text-white/90 leading-relaxed font-medium">
              <p>© 2026 Muve Futures. All rights reserved.</p>
              <p className="flex items-center justify-center gap-1.5 mt-1 text-white">
                <ShieldCheck className="w-4 h-4 text-white" />
                Ofsted Registered Standards • KCSIE 2025 Compliant
              </p>
            </div>
          </div>

          {/* Right Column: Legal Links & Social Icons */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex flex-col items-center md:items-end space-y-1.5 text-xs text-white/90 font-medium">
              <button
                id="link-feedback"
                onClick={() => onOpenLegalModal('Feedback & Complaints Procedure', 'We welcome feedback from schools, local authorities, learners and families. If you wish to register feedback or raise a formal query, please contact our quality assurance team at quality@muvefutures.co.uk.')}
                className="hover:underline hover:text-white cursor-pointer"
              >
                Feedback & Complaints
              </button>
              <button
                id="link-slavery"
                onClick={() => onOpenLegalModal('Modern Slavery Statement', 'Muve Futures operates a zero-tolerance policy towards modern slavery, human trafficking, and exploitation across all educational provisions, staffing networks, and supply chains.')}
                className="hover:underline hover:text-white cursor-pointer"
              >
                Modern Slavery
              </button>
              <button
                id="link-privacy"
                onClick={() => onOpenLegalModal('Privacy Policy', 'Muve Futures is committed to protecting the privacy and personal data of learners, parents, carers, and educational commissioners in full compliance with UK GDPR and Data Protection Act 2018.')}
                className="hover:underline hover:text-white cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                id="link-terms"
                onClick={() => onOpenLegalModal('Terms + Conditions', 'Access and commissioning of Muve Futures programmes is governed by our institutional Service Level Agreements (SLAs) and statutory Section 19 duty frameworks.')}
                className="hover:underline hover:text-white cursor-pointer"
              >
                Terms + Conditions
              </button>
              <button
                id="link-revoke"
                onClick={() => onOpenLegalModal('Revoke Consents', 'You may review or revoke previously granted consent preferences (e.g. photography, transport, data sharing) at any time by emailing dpo@muvefutures.co.uk.')}
                className="hover:underline hover:text-white cursor-pointer"
              >
                Revoke Consents
              </button>
            </div>

            {/* Social Icons */}
            {/* <div className="flex items-center space-x-3 pt-2">
              <a
                id="social-linkedin"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white text-[#8cc63f] hover:bg-white/90 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4 fill-current stroke-none" />
              </a>
              <a
                id="social-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white text-[#8cc63f] hover:bg-white/90 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                id="social-facebook"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white text-[#8cc63f] hover:bg-white/90 flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4 fill-current stroke-none" />
              </a>
            </div> */}
          </div>

        </div>

      </div>
    </footer>
  );
};
