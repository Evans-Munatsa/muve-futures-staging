/**
 * Shared class strings for the Home sections. Desktop sizes are design units
 * (u-*) measured from the Home frame; mobile sizes are ordinary Tailwind.
 */

/** Pill buttons: 51 design units high; the design draws outlined ones with a 6-unit stroke. */
export const homeButton = {
  solid: 'h-11 px-7 text-sm lg:h-auto lg:u-h-51 lg:u-w-247 lg:px-0 lg:u-text-24',
  outline: 'h-11 border-[3px] px-7 text-sm lg:h-auto lg:u-h-51 lg:u-w-247 lg:u-border-6 lg:px-0 lg:u-text-24',
  /** Outlined pill drawn with a 6-unit stroke: 51 high overall; pass the width, e.g. `lg:u-w-311`. */
  outlineSm: 'h-10 border-[3px] px-6 text-sm lg:h-auto lg:u-h-51 lg:u-border-6 lg:px-0 lg:u-text-24',
};

/** 72px section heading (design units), 30px eyebrow and 24px body copy. */
export const homeType = {
  eyebrow: 'text-xs font-bold uppercase tracking-wide lg:u-text-30 lg:leading-[1.2]',
  heading: 'text-3xl font-bold leading-[1.22] tracking-[-0.02em] sm:text-4xl lg:u-text-72',
  body: 'text-sm leading-[1.35] sm:text-base lg:u-text-24',
};
