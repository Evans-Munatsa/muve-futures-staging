// Positions are percentages of the hero + "Why choose us" area, taken from the design frame.
const SHAPES = [
  'left-[8.4%] top-0 aspect-[142/148] w-[12.4%] bg-brand-cyan [clip-path:polygon(0_100%,0_0,100%_65%)]',
  '-left-[3%] top-[47%] aspect-square w-[20.8%] rounded-full bg-brand-orange',
  'left-[15.3%] top-[53%] z-10 aspect-[60/53] w-[5.2%] bg-white [clip-path:polygon(50%_0,100%_100%,0_100%)]',
  'left-[66%] top-[53%] aspect-[93/100] w-[8%] bg-brand-pink [clip-path:polygon(0_45%,100%_0,85%_100%)]',
  '-right-[18.5%] top-[47%] aspect-square w-[41%] rounded-full bg-brand-cyan',
  'right-[1.7%] top-[101%] z-10 aspect-[78/68] w-[6.8%] bg-white [clip-path:polygon(50%_0,100%_100%,0_100%)]',
];

/** Decorative brand shapes behind the services page intro. Render inside a `relative` wrapper. */
export function ServicesBackdrop() {
  return (
    <>
      {SHAPES.map((shape) => (
        <div key={shape} aria-hidden="true" className={`pointer-events-none absolute ${shape}`} />
      ))}
    </>
  );
}
