'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { cn } from '@/lib/utils';

/* ── Pointer tracking ─────────────────────────────────────────────────────
 * One window listener feeds every shape on the page: pointer position is
 * normalised to −1…1 from the viewport centre and smoothed with a spring. */

interface Pointer {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const PointerContext = createContext<Pointer | null>(null);

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    // Mouse/pen only; touch has no hover position to follow.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [rawX, rawY]);

  return <PointerContext.Provider value={{ x, y }}>{children}</PointerContext.Provider>;
}

interface DriftProps {
  children: React.ReactNode;
  /**
   * How strongly the shape responds (design units). Shapes with a larger depth
   * move further with the mouse and with scroll, so they feel closer.
   */
  depth?: number;
  /** Seconds for one float cycle; 0 disables floating. */
  float?: number;
  /** Degrees of gentle rotation while floating. */
  spin?: number;
  /** Delay before the shape pops in. */
  delay?: number;
  /** Hover/tap reactions. Off for large background shapes. */
  interactive?: boolean;
}

/**
 * Wraps SVG shapes (a `<g>`): pops them in, floats them, moves them against
 * the scroll and nudges them toward the mouse. Honours reduced-motion.
 */
/** Scroll + pointer offsets for a shape; `ref` is the element being tracked. */
function useDriftOffsets(ref: React.RefObject<Element | null>, depth: number) {
  const pointer = useContext(PointerContext);
  // Used when there is no PointerProvider above; keeps the hook order fixed.
  const still = useMotionValue(0);

  // useScroll is typed for HTML elements but only needs getBoundingClientRect, which SVG has too.
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [depth * 2, -depth * 2]);
  const x = useTransform(pointer?.x ?? still, (v) => v * depth);
  const pointerY = useTransform(pointer?.y ?? still, (v) => v * depth);
  const y = useTransform([scrollY, pointerY], ([s, p]: number[]) => s + p);
  return { x, y };
}

/**
 * Pop-in, float and hover/tap props shared by the SVG and HTML versions.
 * `shown`, when given, replaces the element's own in-view check (see DriftBox).
 */
function floatProps({ depth, float, spin, delay, interactive, shown }: Required<Omit<DriftProps, 'children'>> & { shown?: boolean }) {
  const floating = float ? { y: [0, -depth * 0.6, 0], rotate: [0, spin, 0] } : {};
  return {
    // Pop in the first time the shape scrolls into view; float continuously.
    initial: { scale: 0, opacity: 0 },
    ...(shown === undefined
      ? { whileInView: { scale: 1, opacity: 1 }, viewport: { once: true, amount: 0.1 }, animate: float ? floating : undefined }
      : { animate: shown ? { scale: 1, opacity: 1, ...floating } : { scale: 0, opacity: 0 } }),
    transition: {
      scale: { type: 'spring' as const, stiffness: 200, damping: 14, delay },
      opacity: { duration: 0.4, delay },
      y: { duration: float, repeat: Infinity, ease: 'easeInOut' as const, delay: delay + 0.6 },
      rotate: { duration: float * 1.3, repeat: Infinity, ease: 'easeInOut' as const, delay: delay + 0.6 },
    },
    whileHover: interactive
      ? { scale: 1.15, transition: { type: 'spring' as const, stiffness: 300, damping: 10 } }
      : undefined,
    whileTap: interactive ? { scale: 0.85, rotate: 120 } : undefined,
  };
}

export function Drift({ children, depth = 20, float = 6, spin = 6, delay = 0, interactive = true }: DriftProps) {
  const ref = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();
  const { x, y } = useDriftOffsets(ref, depth);

  if (reduce) return <g ref={ref}>{children}</g>;

  return (
    <motion.g ref={ref} style={{ x, y }}>
      <motion.g
        // The SVG layer is click-through; the shape itself reacts to hover and tap.
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
          pointerEvents: interactive ? 'auto' : 'none',
          cursor: interactive ? 'grab' : undefined,
        }}
        {...floatProps({ depth, float, spin, delay, interactive })}
      >
        {children}
      </motion.g>
    </motion.g>
  );
}

/**
 * HTML version of `Drift` for absolutely positioned decorative boxes (circles,
 * clip-path triangles). `className` positions and sizes it; `shape` is the
 * colour/radius/clip-path, applied to the moving inner box.
 */
export function DriftBox({
  className,
  shape,
  depth = 20,
  float = 6,
  spin = 6,
  delay = 0,
  interactive = true,
}: Omit<DriftProps, 'children'> & { className: string; shape: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { x, y } = useDriftOffsets(ref, depth);
  // Watch the full-size outer box: the inner one starts at scale 0, and a
  // shape centred off-screen (a circle cut off at the edge) would never count
  // as in view.
  const shown = useInView(ref, { once: true, amount: 0.1 });

  if (reduce) {
    return (
      <div ref={ref} aria-hidden="true" className={cn('pointer-events-none', className)}>
        <div className={cn('h-full w-full', shape)} />
      </div>
    );
  }

  return (
    <motion.div ref={ref} aria-hidden="true" className={cn('pointer-events-none', className)} style={{ x, y }}>
      <motion.div
        className={cn('h-full w-full', shape)}
        style={{
          pointerEvents: interactive ? 'auto' : 'none',
          cursor: interactive ? 'grab' : undefined,
        }}
        {...floatProps({ depth, float, spin, delay, interactive, shown })}
      />
    </motion.div>
  );
}
