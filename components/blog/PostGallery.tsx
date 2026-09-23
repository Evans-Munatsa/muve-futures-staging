'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { GalleryImage } from '@/lib/content/posts';

const arrowClass =
  'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-brand-green shadow-md transition hover:scale-110 lg:u-h-54 lg:u-w-54';

/**
 * The post's photo gallery: three photos per view with arrows over the outer
 * edges (sizes from lg up are the design's), and a full-size viewer.
 */
export function PostGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  // Arrows only when there are more photos than fit.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const check = () => setOverflows(track.scrollWidth > track.clientWidth + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(track);
    return () => observer.disconnect();
  }, [images.length]);

  // One photo per click, wrapping round at either end.
  const step = (direction: -1 | 1) => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const max = track.scrollWidth - track.clientWidth;
    let left = track.scrollLeft + direction * (first.offsetWidth + gap);
    if (direction === 1 && track.scrollLeft >= max - 1) left = 0;
    if (direction === -1 && track.scrollLeft <= 1) left = max;
    track.scrollTo({ left, behavior: 'smooth' });
  };

  const show = (index: number) => setOpen((index + images.length) % images.length);

  if (images.length === 0) return null;
  const current = open === null ? null : images[open];

  return (
    <section aria-label={`Photos: ${title}`} className="relative z-20 mx-auto mt-10 w-[90%] lg:u-mt-57 lg:u-w-1509">
      <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth lg:u-gap-36">
        {images.map((image, i) => (
          <button
            key={`${image.src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}${image.alt ? `: ${image.alt}` : ''}`}
            className="group relative aspect-[479/323] w-[85%] shrink-0 cursor-zoom-in snap-start overflow-hidden rounded-[1.75rem] sm:w-[calc((100%-2rem)/3)] lg:u-w-479 lg:u-rounded-40"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 85vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {overflows && (
        <>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photos" className={cn(arrowClass, '-left-3 lg:-u-left-19')}>
            <ChevronLeft className="h-6 w-6 stroke-[3.5] lg:u-h-32 lg:u-w-32" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next photos" className={cn(arrowClass, '-right-3 lg:-u-right-19')}>
            <ChevronRight className="h-6 w-6 stroke-[3.5] lg:u-h-32 lg:u-w-32" aria-hidden="true" />
          </button>
        </>
      )}

      <Dialog open={current !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          className="max-h-none max-w-6xl overflow-visible border-0 bg-transparent p-0 shadow-none [&>button:last-child]:-top-12 [&>button:last-child]:right-0 [&>button:last-child]:bg-white [&>button:last-child]:text-brand-ink"
          onKeyDown={(e) => {
            if (open === null) return;
            if (e.key === 'ArrowRight') show(open + 1);
            if (e.key === 'ArrowLeft') show(open - 1);
          }}
        >
          <DialogTitle className="sr-only">{`Photo ${(open ?? 0) + 1} of ${images.length}`}</DialogTitle>
          {current && (
            <figure>
              <div className="relative h-[75vh] w-full">
                {/* Keyed so the old photo never lingers while the next one loads. */}
                <Image key={current.src} src={current.src} alt={current.alt} fill loading="eager" sizes="90vw" className="rounded-[1.75rem] object-contain" />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm font-semibold text-white">
                <span>{current.alt}</span>
                <span className="shrink-0">
                  {(open ?? 0) + 1} / {images.length}
                </span>
              </figcaption>
            </figure>
          )}
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => show((open ?? 0) - 1)} aria-label="Previous photo" className={cn(arrowClass, 'left-2 sm:-left-16')}>
                <ChevronLeft className="h-6 w-6 stroke-[3.5]" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => show((open ?? 0) + 1)} aria-label="Next photo" className={cn(arrowClass, 'right-2 sm:-right-16')}>
                <ChevronRight className="h-6 w-6 stroke-[3.5]" aria-hidden="true" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
