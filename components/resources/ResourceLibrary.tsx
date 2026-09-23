'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Download, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import type { ResourceGroup, ResourceItem, ResourcesContent } from '@/lib/content/pages';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Height-animated panel for the accordions. */
function Collapse({ open, id, children }: { open: boolean; id: string; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ToggleIcon({ open, className }: { open: boolean; className?: string }) {
  const Icon = open ? Minus : Plus;
  return <Icon className={cn('h-5 w-5 shrink-0 stroke-[3.5] sm:h-6 sm:w-6', className)} aria-hidden="true" />;
}

function ResourceRow({ item, shade, open, onToggle }: { item: ResourceItem; shade: string; open: boolean; onToggle: () => void }) {
  const panelId = useId();
  // A blank line in the CMS text starts a new paragraph.
  const paragraphs = item.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const external = /^https?:\/\//.test(item.linkUrl);

  return (
    <li className={cn('transition-colors duration-300', open ? 'bg-white' : shade)}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-4 py-4 pr-5 pl-6 text-left text-sm font-bold sm:py-5 sm:pr-8 sm:pl-20 sm:text-lg',
          open ? 'text-brand-ink' : 'text-white hover:brightness-105'
        )}
      >
        <span>{item.title}</span>
        <ToggleIcon open={open} />
      </button>

      <Collapse open={open} id={panelId}>
        <div className="pr-5 pb-7 pl-6 sm:pr-8 sm:pl-20">
          {paragraphs.length > 0 && (
            <div className="scrollbar-brand max-h-64 space-y-4 overflow-y-auto pr-6 text-sm leading-relaxed whitespace-pre-line text-brand-ink sm:pr-16 sm:text-base">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {(item.fileUrl || (item.linkLabel && item.linkUrl)) && (
            <div className={cn('flex flex-wrap gap-3', paragraphs.length > 0 && 'mt-5')}>
              {item.fileUrl && (
                <Button asChild variant="navy" size="pill-sm" className="gap-1.5 px-7">
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" download>
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Download
                  </a>
                </Button>
              )}
              {item.linkLabel && item.linkUrl && (
                <Button asChild variant="navy" size="pill-sm" className="px-7">
                  {external ? (
                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                      {item.linkLabel}
                    </a>
                  ) : (
                    <Link href={item.linkUrl}>{item.linkLabel}</Link>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </Collapse>
    </li>
  );
}

function Group({ group, open, onToggle }: { group: ResourceGroup; open: boolean; onToggle: () => void }) {
  const panelId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) =>
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-bold text-white sm:text-xl"
      >
        <span>{group.name}</span>
        <ToggleIcon open={open} />
      </button>

      <Collapse open={open} id={panelId}>
        <ul>
          {group.items.map((item, i) => (
            <ResourceRow
              key={`${item.title}-${i}`}
              item={item}
              // Closed rows alternate between the two brand greens.
              shade={i % 2 === 0 ? 'bg-brand-green' : 'bg-brand-leaf'}
              open={openItems.has(i)}
              onToggle={() => toggleItem(i)}
            />
          ))}
        </ul>
      </Collapse>
    </div>
  );
}

/** The orange resource panel: filter pills over collapsible groups of resources. */
export function ResourceLibrary({ content }: { content: ResourcesContent['library'] }) {
  const groups = content.groups.filter((group) => group.items.length > 0);
  const [filter, setFilter] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(groups[0] ? [groups[0].name] : []));

  const selectFilter = (name: string | null) => {
    setFilter(name);
    // Choosing a group opens it; "all" goes back to just the first group open.
    const first = name ?? groups[0]?.name;
    setOpenGroups(new Set(first ? [first] : []));
  };

  const toggleGroup = (name: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  const shown = filter ? groups.filter((group) => group.name === filter) : groups;
  const pills: { label: string; value: string | null }[] = [
    { label: content.allLabel, value: null },
    ...groups.map((group) => ({ label: group.name, value: group.name })),
  ];

  return (
    <section id="resource-library" className="relative z-20 mx-auto w-[90%] max-w-6xl scroll-mt-24">
      <Reveal className="rounded-tr-[3rem] bg-brand-orange px-5 py-10 sm:rounded-tr-[5rem] sm:px-16 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{content.title}</h2>

        <div role="group" aria-label="Filter resources" className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-x-5 sm:gap-y-3">
          {pills.map((pill) => {
            const active = filter === pill.value;
            return (
              <button
                key={pill.label}
                type="button"
                onClick={() => selectFilter(pill.value)}
                aria-pressed={active}
                className={cn(
                  'min-w-28 cursor-pointer rounded-full border-[3px] border-white px-4 py-0.5 text-xs font-bold transition-colors sm:text-sm',
                  active ? 'bg-white text-brand-ink' : 'text-white hover:bg-white/15'
                )}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8">
          {shown.map((group) => (
            <Group key={group.name} group={group} open={openGroups.has(group.name)} onToggle={() => toggleGroup(group.name)} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
