interface ClosingCtaProps {
  title: React.ReactNode;
  children: React.ReactNode;
  action: React.ReactNode;
}

/** Centred end-of-page call to action. */
export function ClosingCta({ title, children, action }: ClosingCtaProps) {
  return (
    <section className="relative z-20 mx-auto w-[90%] max-w-4xl py-16 text-center sm:py-24">
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white sm:text-lg">{children}</p>

      <div className="mt-8">{action}</div>
    </section>
  );
}
