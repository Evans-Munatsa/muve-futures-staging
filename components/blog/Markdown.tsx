import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/*
 * Renders blog post Markdown in the brand style. react-markdown ignores raw
 * HTML by default, so post bodies can't inject scripts or markup.
 */

const components: Components = {
  h2: ({ children }) => <h2 className="mt-10 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 text-xl font-bold text-brand-ink sm:text-2xl">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-6 text-lg font-bold text-brand-ink">{children}</h4>,
  p: ({ children }) => <p className="mt-5 leading-relaxed">{children}</p>,
  a: ({ href = '', children }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-semibold text-brand-orange underline decoration-2 underline-offset-2 hover:text-brand-ink"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-brand-orange">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 marker:font-bold marker:text-brand-orange">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 rounded-tr-[2rem] border-l-4 border-brand-orange bg-brand-lime px-6 py-4 text-brand-ink [&>p:first-child]:mt-0">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    // Post images can come from anywhere, so a plain lazy <img> rather than next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} loading="lazy" decoding="async" className="mt-6 w-full rounded-tr-[2rem]" />
  ),
  hr: () => <hr className="my-10 border-brand-green" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b-2 border-brand-green px-3 py-2 text-left font-bold">{children}</th>,
  td: ({ children }) => <td className="border-b border-neutral-200 px-3 py-2">{children}</td>,
  code: ({ children }) => <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.9em]">{children}</code>,
};

export function Markdown({ source }: { source: string }) {
  return (
    <div className="text-base text-brand-ink sm:text-lg [&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
