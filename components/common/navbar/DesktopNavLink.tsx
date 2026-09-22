'use client';

import Link from 'next/link';
import { NavLinkConfig } from '@/constants';
import { cn } from '@/lib/utils';

interface DesktopNavLinkProps {
  link: NavLinkConfig;
  isActive: boolean;
  isOpen: boolean;
  align: 'left' | 'right';
  onOpen: () => void;
  onScheduleClose: () => void;
  onNavigate: () => void;
}

export function DesktopNavLink({
  link,
  isActive,
  isOpen,
  align,
  onOpen,
  onScheduleClose,
  onNavigate,
}: DesktopNavLinkProps) {
  const hasDropdown = !!link.dropdown;

  return (
    <div
      className="relative"
      onMouseEnter={hasDropdown ? onOpen : undefined}
      onMouseLeave={hasDropdown ? onScheduleClose : undefined}
      onFocus={hasDropdown ? onOpen : undefined}
    >
      <Link
        href={link.href}
        id={`nav-${link.id}`}
        onClick={onNavigate}
        aria-haspopup={hasDropdown || undefined}
        aria-expanded={hasDropdown ? isOpen : undefined}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'relative block py-2 text-base font-semibold transition-colors lg:py-0 lg:u-text-24 lg:leading-[1.2]',
          // underline bar under the active (or open) item, as in the design
          'after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] lg:after:-u-bottom-18 lg:after:u-h-4 after:rounded-full after:bg-brand-orange after:transition-opacity',
          isActive || isOpen ? 'text-brand-orange' : 'text-white hover:text-brand-orange',
          isActive ? 'after:opacity-100' : 'after:opacity-0'
        )}
      >
        {link.label}
      </Link>

      {hasDropdown && isOpen && (
        <div
          id={`dropdown-menu-${link.id}`}
          className={cn(
            'absolute top-[calc(100%+1rem)] z-50 min-w-72 bg-brand-orange px-8 py-8 text-right shadow-xl',
            'animate-in fade-in-0 zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          <Link
            href={link.href}
            onClick={onNavigate}
            className="block text-lg font-bold text-white hover:underline"
          >
            {link.label}
          </Link>
          <ul className="mt-1 space-y-0.5">
            {link.dropdown!.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block whitespace-nowrap text-base text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
