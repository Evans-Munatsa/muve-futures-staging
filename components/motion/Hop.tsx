'use client';

import { motion } from 'motion/react';

interface HopProps {
  children: React.ReactNode;
  className?: string;
  /** How far it jumps on hover, in px. */
  height?: number;
  /** Degrees of tilt while hovering. */
  tilt?: number;
}

/** Springy "hop" on hover and a squish on tap — for cut-out photos and illustrations. */
export function Hop({ children, className, height = 16, tilt = -2 }: HopProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -height, rotate: tilt }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
    >
      {children}
    </motion.div>
  );
}
