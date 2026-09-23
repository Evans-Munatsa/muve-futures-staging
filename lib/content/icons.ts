import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  CalendarCheck,
  Crown,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  Puzzle,
  RotateCcw,
  Send,
  ShieldCheck,
  Shuffle,
  Sparkles,
  UserRound,
  Users,
  Users2,
} from 'lucide-react';

/**
 * Icons a service card can use. Content stores the name (e.g. "Crown"), since
 * components can't be saved to the database; the dashboard offers these as a
 * dropdown.
 */
export const SERVICE_ICONS = {
  Crown,
  Users,
  Users2,
  Laptop,
  Shuffle,
  RotateCcw,
  Send,
  Lightbulb,
  CalendarCheck,
  UserRound,
  HeartHandshake,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Puzzle,
  Sparkles,
} satisfies Record<string, LucideIcon>;

export type ServiceIconName = keyof typeof SERVICE_ICONS;

export function serviceIcon(name: string): LucideIcon {
  return SERVICE_ICONS[name as ServiceIconName] ?? Sparkles;
}
