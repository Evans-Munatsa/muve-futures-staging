import { DriftBox } from '@/components/motion/Drift';

// Positions are percentages of the hero + "Why choose us" area, taken from the design frame.
const SHAPES = [
  { at: 'left-[8.4%] top-0 aspect-[142/148] w-[12.4%]', shape: 'bg-brand-cyan [clip-path:polygon(0_100%,0_0,100%_65%)]', depth: 30 },
  { at: '-left-[3%] top-[47%] aspect-square w-[20.8%]', shape: 'rounded-full bg-brand-orange', depth: 16, round: true },
  { at: 'left-[15.3%] top-[53%] z-10 aspect-[60/53] w-[5.2%]', shape: 'bg-white [clip-path:polygon(50%_0,100%_100%,0_100%)]', depth: 40 },
  { at: 'left-[66%] top-[53%] aspect-[93/100] w-[8%]', shape: 'bg-brand-pink [clip-path:polygon(0_45%,100%_0,85%_100%)]', depth: 34 },
  { at: '-right-[18.5%] top-[47%] aspect-square w-[41%]', shape: 'rounded-full bg-brand-cyan', depth: 18, round: true },
  { at: 'right-[1.7%] top-[101%] z-10 aspect-[78/68] w-[6.8%]', shape: 'bg-white [clip-path:polygon(50%_0,100%_100%,0_100%)]', depth: 38 },
];

/** Decorative brand shapes behind the services page intro. Render inside a `relative` wrapper. */
export function ServicesBackdrop() {
  return (
    <>
      {SHAPES.map(({ at, shape, depth, round }, i) => (
        <DriftBox
          key={at}
          className={`absolute ${at}`}
          shape={shape}
          depth={depth}
          delay={i * 0.1}
          spin={round ? 0 : i % 2 ? -14 : 14}
          float={round ? 9 : 6}
          interactive={!round}
        />
      ))}
    </>
  );
}
