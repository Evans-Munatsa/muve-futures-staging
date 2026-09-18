import React, { useState } from 'react';
import {
  Compass,
  ArrowLeft,
  Home,
  BookOpen,
  HeartHandshake,
  FileText,
  Send,
  Phone,
  Search,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PageId } from '@/app/types';
import { SITE_CONFIG } from '@/app/constants';

interface NotFoundProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenReferral: () => void;
  onOpenSearch?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  onNavigate,
  onOpenReferral,
  onOpenSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      onNavigate('resources');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] pt-32 pb-24 text-[#092233] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main 404 Container */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
          {/* Subtle brand geometry */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#8cc63f]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#f05a28]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-[#f05a28]/10 text-[#f05a28] flex items-center justify-center mx-auto mb-6">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-black uppercase tracking-wider text-neutral-600 mb-4">
            Error 404 • Pathway Not Found
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-[#092233] tracking-tight mb-4">
            Let&apos;s Get You Back on Course
          </h1>

          <p className="text-base text-neutral-600 max-w-lg mx-auto leading-relaxed mb-8">
            The page, guide, or link you are trying to view might have moved or been updated.
            Use our quick pathways below to find the right information.
          </p>

          {/* Inline Quick Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-md mx-auto mb-10 relative flex items-center"
          >
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              id="input-404-search"
              placeholder="Search services, EBSNA guides, policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-24 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8cc63f] focus:bg-white transition"
            />
            <button
              type="submit"
              id="btn-404-search-submit"
              className="absolute right-2 px-3 py-1.5 bg-[#092233] text-white rounded-xl text-xs font-bold hover:bg-[#133c57] transition cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Pathways Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left mb-8">
            <button
              type="button"
              id="btn-404-nav-home"
              onClick={() => onNavigate('home')}
              className="p-4 rounded-2xl border border-neutral-200 hover:border-[#8cc63f] hover:bg-[#8cc63f]/5 transition group cursor-pointer"
            >
              <Home className="w-5 h-5 text-[#8cc63f] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-[#092233]">Home Page</div>
              <div className="text-[11px] text-neutral-500">Overview &amp; philosophy</div>
            </button>

            <button
              type="button"
              id="btn-404-nav-services"
              onClick={() => onNavigate('services')}
              className="p-4 rounded-2xl border border-neutral-200 hover:border-[#f05a28] hover:bg-[#f05a28]/5 transition group cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-[#f05a28] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-[#092233]">AP Services</div>
              <div className="text-[11px] text-neutral-500">1:1 &amp; specialist models</div>
            </button>

            <button
              type="button"
              id="btn-404-nav-support"
              onClick={() => onNavigate('who-we-support')}
              className="p-4 rounded-2xl border border-neutral-200 hover:border-[#d93c8c] hover:bg-[#d93c8c]/5 transition group cursor-pointer"
            >
              <HeartHandshake className="w-5 h-5 text-[#d93c8c] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-[#092233]">Who We Support</div>
              <div className="text-[11px] text-neutral-500">Needs matrix &amp; cases</div>
            </button>

            <button
              type="button"
              id="btn-404-nav-resources"
              onClick={() => onNavigate('resources')}
              className="p-4 rounded-2xl border border-neutral-200 hover:border-[#092233] hover:bg-[#092233]/5 transition group cursor-pointer"
            >
              <FileText className="w-5 h-5 text-[#092233] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-[#092233]">Resources &amp; QA</div>
              <div className="text-[11px] text-neutral-500">Toolkits &amp; policies</div>
            </button>
          </div>

          {/* Primary Action Row */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              id="btn-404-return-home"
              onClick={() => onNavigate('home')}
              className="bg-[#092233] text-white hover:bg-[#133c57] rounded-xl px-6 py-2.5 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Safe Landing</span>
            </Button>

            <Button
              id="btn-404-open-referral"
              onClick={onOpenReferral}
              className="bg-[#8cc63f] text-[#092233] hover:bg-[#76aa33] rounded-xl px-6 py-2.5 text-xs font-black flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Make a Student Referral</span>
            </Button>
          </div>
        </div>

        {/* Immediate Assistance Banner */}
        <div className="mt-6 text-center text-xs text-neutral-500">
          Looking for urgent placement support? Call our duty referral line directly at{' '}
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="font-bold text-[#092233] hover:text-[#8cc63f] underline"
          >
            {SITE_CONFIG.contact.phone}
          </a>{' '}
          (Mon–Fri 8:00–17:30)
        </div>
      </div>
    </div>
  );
};
