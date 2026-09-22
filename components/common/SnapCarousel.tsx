'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SnapCarouselProps<T> {
  items: T[];
  getKey: (item: T) => string;
  /** Accessible name for an item, used by the position dots. */
  getLabel: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  /** Noun used in the arrow labels, e.g. "service" → "Previous service". */
  itemNoun: string;
  arrowClassName?: string;
  showDots?: boolean;
}

/**
 * Horizontally scrolling, scroll-snapped card track with prev/next arrows.
 * Three cards per view from `sm` up, one (with a peek of the next) on mobile.
 */
export function SnapCarousel<T>({
  items,
  getKey,
  getLabel,
  renderItem,
  itemNoun,
  arrowClassName,
  showDots = false,
}: SnapCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Cards snap to the track's left edge, so the "active" card is the one
  // nearest that edge. Recomputed on scroll (including manual swipes) and
  // resize so the arrows/dots stay in sync.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { scrollLeft, scrollWidth, clientWidth, offsetLeft } = track;
        let closest = 0;
        let closestDistance = Infinity;
        itemRefs.current.forEach((item, i) => {
          if (!item) return;
          const distance = Math.abs(item.offsetLeft - offsetLeft - scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = i;
          }
        });
        setActiveIdx(closest);
        setAtStart(scrollLeft <= 1);
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      });
    };

    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll the track itself rather than calling `scrollIntoView()`, which may
  // also scroll every scrollable ancestor (visibly shifting the page) and can
  // fight `snap-mandatory`'s own snap correction.
  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const target = itemRefs.current[Math.max(0, Math.min(items.length - 1, index))];
    if (!track || !target) return;
    // Both offsets share the same positioned ancestor, so the difference is
    // the card's position within the track's scroll area.
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  // Stop mousedown from focusing the edge-anchored arrows, which would
  // otherwise nudge the page to keep them in view. Keyboard use is unaffected.
  const preventFocusScroll = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const arrowClasses = cn(
    'absolute z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md transition',
    'disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12',
    arrowClassName
  );

  return (
    <>
      <div className="relative flex items-center">
        <button
          type="button"
          onMouseDown={preventFocusScroll}
          onClick={() => scrollToIndex(activeIdx - 1)}
          disabled={atStart}
          aria-label={`Previous ${itemNoun}`}
          className={cn(arrowClasses, '-left-4')}
        >
          <ChevronLeft className="h-5 w-5 stroke-[3]" />
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar -my-6 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-6 sm:gap-8"
        >
          {items.map((item, i) => (
            <div
              key={getKey(item)}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="flex w-[85%] shrink-0 snap-start sm:w-[calc((100%-4rem)/3)]"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>

        <button
          type="button"
          onMouseDown={preventFocusScroll}
          onClick={() => scrollToIndex(activeIdx + 1)}
          disabled={atEnd}
          aria-label={`Next ${itemNoun}`}
          className={cn(arrowClasses, '-right-4')}
        >
          <ChevronRight className="h-5 w-5 stroke-[3]" />
        </button>
      </div>

      {showDots && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={getKey(item)}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${getLabel(item)}`}
              aria-current={i === activeIdx || undefined}
              className={cn(
                'h-2 rounded-full transition-all',
                i === activeIdx ? 'w-6 bg-brand-orange' : 'w-2 bg-white/60'
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
