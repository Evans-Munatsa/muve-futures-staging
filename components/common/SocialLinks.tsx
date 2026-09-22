import { SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';

// lucide-react no longer ships brand marks, so the three glyphs are inlined.
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: SITE_CONFIG.socials.linkedin,
    icon: (
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    ),
  },
  {
    label: 'Instagram',
    href: SITE_CONFIG.socials.instagram,
    icon: (
      <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17.1 5.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2zm3.7 14.5a3.7 3.7 0 0 1-3.7 3.7h-9a3.7 3.7 0 0 1-3.7-3.7v-9a3.7 3.7 0 0 1 3.7-3.7h9a3.7 3.7 0 0 1 3.7 3.7z" />
    ),
  },
  {
    label: 'Facebook',
    href: SITE_CONFIG.socials.facebook,
    icon: (
      <path d="M14 8h2.5V4.5H14C11.5 4.5 10 6.2 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.8c0-.5.3-.8.5-.8z" />
    ),
  },
];

/** White circular LinkedIn / Instagram / Facebook links. */
export function SocialLinks({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  return (
    <ul className={cn('flex gap-3', className)}>
      {SOCIALS.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={`Muve Futures on ${label}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-green transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
              linkClassName
            )}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 lg:u-h-26 lg:u-w-26" fill="currentColor" aria-hidden="true">
              {icon}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
