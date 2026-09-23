'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { PageId } from '@/app/types';
import type { NavLinkConfig } from '@/constants';

interface MobileNavMenuProps {
  currentPage: PageId;
  onNavigate: () => void;
  links: NavLinkConfig[];
}

export function MobileNavMenu({ currentPage, onNavigate, links }: MobileNavMenuProps) {
  const [expanded, setExpanded] = useState<Partial<Record<PageId, boolean>>>({});

  const toggle = (id: PageId) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <nav
      id="mobile-nav"
      className="lg:hidden bg-brand-green border-t border-white/20 px-5 py-5 space-y-4 animate-in slide-in-from-top-3 duration-200 shadow-xl max-h-[80vh] overflow-y-auto"
    >
      <ul className="flex flex-col space-y-1 font-bold text-base">
        {links.map((link) => {
          const isActive = currentPage === link.id;
          const isExpanded = !!expanded[link.id];

          return (
            <li key={link.id} className="flex flex-col">
              <div
                className={`flex items-center justify-between rounded-xl transition ${
                  isActive ? 'bg-white text-brand-ink' : 'text-white hover:bg-white/10'
                }`}
              >
                <Link
                  href={link.href}
                  id={`mobile-nav-${link.id}`}
                  onClick={onNavigate}
                  aria-current={isActive ? 'page' : undefined}
                  className="flex-1 py-3 px-3.5 font-extrabold"
                >
                  {link.label}
                </Link>

                {link.dropdown && (
                  <button
                    type="button"
                    onClick={() => toggle(link.id)}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle ${link.label} sections`}
                    className={`p-3 rounded-xl transition cursor-pointer ${
                      isActive ? 'text-brand-ink hover:bg-neutral-100' : 'text-white hover:bg-[#F05B25]'
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>

              {link.dropdown && isExpanded && (
                <ul className="pl-3 pr-1 py-2 my-1 space-y-1 bg-black/10 rounded-xl">
                  {link.dropdown.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className="block w-full p-2.5 rounded-lg text-white/95 hover:bg-white/20 transition text-xs font-semibold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
