"use client";
// import { useState, useRef, useEffect, useMemo } from "react";
import { useState, useRef, useEffect } from "react";
import { Logo } from './Logo';
import { Search, Menu, X, Phone, Mail, ChevronDown} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageId } from '@/app/types';
import { NAV_LINKS_CONFIG, SITE_CONFIG, NavLinkConfig } from '@/constants';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenReferral: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenReferral,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<PageId | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<Record<string, boolean>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (id: PageId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClick = (page: PageId, sectionId?: string) => {
    onNavigate(page, sectionId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileAccordion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMobile((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const navLinks = NAV_LINKS_CONFIG;
  const leftNav = navLinks.slice(0, 3); // Home, About Us, Services
  const rightNav = navLinks.slice(3); // Who We Support, Resource, Contact

  const renderDropdownMenu = (link: NavLinkConfig, align: 'left' | 'right' = 'left') => {
    if (!link.dropdown) return null;
    const isOpen = activeDropdown === link.id;
    if (!isOpen) return null;

    return (
      <div
        id={`dropdown-menu-${link.id}`}
        onMouseEnter={() => handleMouseEnter(link.id)}
        onMouseLeave={handleMouseLeave}
        className={`absolute top-[calc(100%+8px)] ${
          align === 'right' ? 'right-0' : 'left-0'
        } w-80 sm:w-[200px] bg-[#F05B25] p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150`}
      >
        

        {/* Dropdown Items List targeting exact sections */}
        <div className="py-1.5 space-y-1">
          {link.dropdown.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.sectionId}
                type="button"
                id={`dropdown-item-${item.sectionId}`}
                onClick={() => handleNavClick(link.id, item.sectionId)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-50 transition-colors flex items-start gap-3 group/item cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#fff] group-hover/item:text-[#f05a28] transition-colors truncate">
                      {item.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <header
      ref={navContainerRef}
      className="w-full bg-[#A5CD39] text-white sticky top-0 z-40">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Desktop Left Nav: Home, About Us, Services (with exact section dropdown) */}
        <nav className="hidden lg:flex items-center space-x-1.5 text-sm font-semibold tracking-wide">
          {leftNav.map((link) => {
            const isActive = currentPage === link.id;
            const hasDropdown = !!link.dropdown;
            const isMenuOpen = activeDropdown === link.id;

            return (
              <div
                key={link.id}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(link.id)}
                onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
              >
                <div className="inline-flex items-center">
                  <button
                    type="button"
                    id={`nav-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#F05B25] shadow-xs font-bold'
                        : 'text-white hover:bg-[#F05B25]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMenuOpen ? 'rotate-180 text-[#f05a28]' : 'opacity-80'
                        }`}
                      />
                    )}
                  </button>
                </div>

                {hasDropdown && renderDropdownMenu(link, 'left')}
              </div>
            );
          })}
        </nav>

        {/* Center Brand Logo */}
        <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
          <a href="/">
              <img
                src="/logo.svg"
                width={160}
                height={60}
                alt="Muve Healthcare"
              />
            </a>
        </div>

        {/* Desktop Right Nav: Who We Support, Resource, Contact (all with exact section dropdowns), Search & Referral CTA */}
        <div className="hidden lg:flex items-center space-x-1.5 text-sm font-semibold">
          {rightNav.map((link) => {
            const isActive = currentPage === link.id;
            const hasDropdown = !!link.dropdown;
            const isMenuOpen = activeDropdown === link.id;

            return (
              <div
                key={link.id}
                className="relative"
                onMouseEnter={() => hasDropdown && handleMouseEnter(link.id)}
                onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
              >
                <div className="inline-flex items-center">
                  <button
                    type="button"
                    id={`nav-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#F05B25] shadow-xs font-bold'
                        : 'text-white hover:bg-[#F05B25]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMenuOpen ? 'rotate-180 text-[#f05a28]' : 'opacity-80'
                        }`}
                      />
                    )}
                  </button>
                </div>

                {hasDropdown && renderDropdownMenu(link, 'right')}
              </div>
            );
          })}

          {/* Search Button Pill */}
          <button
            id="btn-search"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/80 text-white hover:bg-white/15 transition-colors cursor-pointer text-xs font-bold ml-1.5"
            aria-label="Search site"
            title="Search site"
          >
            <span className="opacity-70 text-xs">—</span>
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Quick CTA using Shadcn Button */}
          <Button
            id="nav-quick-referral"
            variant="coral"
            size="sm"
            onClick={onOpenReferral}
            className="ml-2 font-bold shadow-md"
          >
            Make a Referral
          </Button>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            id="btn-mobile-search"
            onClick={onOpenSearch}
            className="p-2 rounded-full border border-white/80 text-white hover:bg-white/15 transition cursor-pointer"
            aria-label="Open Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <Button
            id="btn-mobile-referral-quick"
            variant="coral"
            size="sm"
            onClick={onOpenReferral}
            className="text-xs px-3 h-8"
          >
            Referral
          </Button>

          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-white hover:bg-white/15 transition cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer with Accordions for exact section targets */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#72a930] border-t border-white/20 px-5 py-5 space-y-4 animate-in slide-in-from-top-3 duration-200 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-1 font-bold text-base">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              const hasDropdown = !!link.dropdown;
              const isExpanded = !!expandedMobile[link.id];

              return (
                <div key={link.id} className="flex flex-col">
                  <div
                    className={`flex items-center justify-between rounded-xl transition ${
                      isActive ? 'bg-white text-[#092233]' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <button
                      type="button"
                      id={`mobile-nav-${link.id}`}
                      onClick={() => handleNavClick(link.id)}
                      className="flex-1 text-left py-3 px-3.5 font-extrabold flex items-center gap-2 cursor-pointer"
                    >
                      <span>{link.label}</span>
                    </button>

                    {hasDropdown && (
                      <button
                        type="button"
                        id={`mobile-toggle-${link.id}`}
                        onClick={(e) => toggleMobileAccordion(link.id, e)}
                        className={`p-3 rounded-xl transition cursor-pointer ${
                          isActive
                            ? 'text-[#092233] hover:bg-neutral-100'
                            : 'text-white hover:bg-[#F05B25]'
                        }`}
                        aria-label={`Toggle ${link.label} sections`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Sub-items */}
                  {hasDropdown && isExpanded && (
                    <div className="pl-3 pr-1 py-2 my-1 space-y-1 bg-black/10 rounded-xl">
                      {link.dropdown?.map((subItem) => {
                        const Icon = subItem.icon;
                        return (
                          <button
                            key={subItem.sectionId}
                            type="button"
                            id={`mobile-subitem-${subItem.sectionId}`}
                            onClick={() => handleNavClick(link.id, subItem.sectionId)}
                            className="w-full text-left p-2.5 rounded-lg text-white/95 hover:bg-white/20 transition flex items-center justify-between text-xs font-semibold cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              {/* <Icon className="w-3.5 h-3.5 text-white/80" /> */}
                              <span>{subItem.label}</span>
                            </div>
                            {/* <ChevronRight className="w-3.5 h-3.5 opacity-60" /> */}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}
    </header>
  );
};
