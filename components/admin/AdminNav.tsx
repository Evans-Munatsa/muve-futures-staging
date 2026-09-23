'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, FileText, LayoutDashboard, LogOut, Newspaper, Users } from 'lucide-react';
import { logout } from '@/lib/admin/auth-actions';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/content', label: 'Website content', icon: FileText },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/users', label: 'Admins', icon: Users },
];

export function AdminNav({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex h-full flex-col gap-1 p-4 text-sm">
      {LINKS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold transition',
              active ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" /> {label}
          </Link>
        );
      })}

      <div className="mt-auto space-y-1 border-t border-white/15 pt-3">
        <a href="/home" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-white/80 hover:bg-white/10 hover:text-white">
          <ExternalLink className="h-4 w-4" aria-hidden="true" /> View website
        </a>
        <form action={logout}>
          <button type="submit" className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-white/80 hover:bg-white/10 hover:text-white">
            <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
          </button>
        </form>
        <p className="truncate px-3 pt-1 text-xs text-white/60">Signed in as {name}</p>
      </div>
    </nav>
  );
}
