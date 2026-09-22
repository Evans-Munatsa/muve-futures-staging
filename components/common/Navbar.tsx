'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DesktopNavLink } from '@/components/common/navbar/DesktopNavLink';
import { MobileNavMenu } from '@/components/common/navbar/MobileNavMenu';
import { PageId } from '@/app/types';
import { NAV_LINKS_CONFIG, REFERRAL_HREF } from '@/constants';

const DROPDOWN_CLOSE_DELAY_MS = 180;

// The logo sits between these two groups on desktop (it doubles as the Home link).
const LEFT_NAV = NAV_LINKS_CONFIG.filter((link) => link.id === 'services' || link.id === 'who-we-support');
const RIGHT_NAV = NAV_LINKS_CONFIG.filter((link) => link.id === 'resources' || link.id === 'contact');

interface NavbarProps {
  currentPage: PageId;
  onOpenSearch: () => void;
}

export function Navbar({ currentPage, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<PageId | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Close any open dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openDropdown = (id: PageId) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(id);
  };

  const scheduleCloseDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), DROPDOWN_CLOSE_DELAY_MS);
  };

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const renderDesktopLinks = (links: typeof NAV_LINKS_CONFIG, align: 'left' | 'right') =>
    links.map((link) => (
      <DesktopNavLink
        key={link.id}
        link={link}
        align={align}
        isActive={currentPage === link.id}
        isOpen={activeDropdown === link.id}
        onOpen={() => openDropdown(link.id)}
        onScheduleClose={scheduleCloseDropdown}
        onNavigate={closeMenus}
      />
    ));

  return (
    // Sticky on mobile. On desktop the header matches the design frames (305 design
    // units tall, see app/globals.css) and scrolls away with the page.
    <header ref={headerRef} className="sticky top-0 z-40 w-full bg-brand-green text-white lg:static">
      <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:relative lg:block lg:u-h-305 lg:u-w-1920 lg:px-0">
        <nav aria-label="Primary" className="hidden items-center lg:absolute lg:u-left-255 lg:u-top-160 lg:flex lg:u-gap-65">
          {renderDesktopLinks(LEFT_NAV, 'left')}
        </nav>

        <div className="flex flex-1 justify-start lg:absolute lg:u-left-820 lg:u-top-107">
          <Link href="/" onClick={closeMenus} aria-label="Muve Futures home">
            <Image
              src="/logo.svg"
              width={281}
              height={135}
              alt="Muve Futures"
              priority
              className="h-12 w-auto lg:h-auto lg:u-w-280"
            />
          </Link>
        </div>

        <div className="hidden items-center lg:absolute lg:u-left-1264 lg:u-top-156 lg:flex lg:u-h-42 lg:u-gap-66">
          <nav aria-label="Secondary" className="flex items-center lg:u-gap-67">
            {renderDesktopLinks(RIGHT_NAV, 'right')}
          </nav>

          <button
            type="button"
            id="btn-search"
            onClick={onOpenSearch}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-brand-navy transition hover:shadow-md lg:u-h-42 lg:u-w-87"
            aria-label="Search site"
            title="Search site"
          >
            <span className="font-bold leading-none lg:u-text-18" aria-hidden="true">
              …
            </span>
            <Search className="stroke-[3] lg:u-h-22 lg:u-w-22" />
          </button>
        </div>

        {/* Mobile action controls */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            type="button"
            id="btn-mobile-search"
            onClick={onOpenSearch}
            className="p-2 rounded-full border border-white/80 text-white hover:bg-white/15 transition cursor-pointer"
            aria-label="Open Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <Button asChild variant="orange" size="sm" className="h-8 px-3 text-xs">
            <Link id="btn-mobile-referral-quick" href={REFERRAL_HREF} onClick={closeMenus}>
              Referral
            </Link>
          </Button>

          <button
            type="button"
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 rounded-xl text-white hover:bg-white/15 transition cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && <MobileNavMenu currentPage={currentPage} onNavigate={closeMenus} />}
    </header>
  );
}
