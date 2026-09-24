'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, ExternalLink, FileText, Inbox, LayoutDashboard, LogOut, Newspaper, Users } from 'lucide-react';
import { logout } from '@/lib/admin/auth-actions';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/inbox', label: 'Inbox', icon: Inbox, badge: 'inbox' as const },
  { href: '/admin/content', label: 'Website content', icon: FileText },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/careers', label: 'Careers', icon: Briefcase, badge: 'careers' as const },
  { href: '/admin/users', label: 'Admins', icon: Users },
];

/** `counts` are unread Inbox messages and new job applications, shown as badges. */
export function AdminNav({ name, counts }: { name: string; counts: { inbox: number; careers: number } }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex h-full flex-col gap-1 p-4 text-sm">
      {LINKS.map(({ href, label, icon: Icon, exact, badge }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        const n = badge ? counts[badge] : 0;
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
            {n > 0 && (
              <span className="ml-auto rounded-full bg-brand-orange px-2 py-0.5 text-[11px] font-bold text-white">
                {n > 99 ? '99+' : n}
                <span className="sr-only"> new</span>
              </span>
            )}
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
