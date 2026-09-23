import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/*
 * Renders blog post Markdown in the brand style. react-markdown ignores raw
 * HTML by default, so post bodies can't inject scripts or markup.
 */

/*
 * Spacing follows the article in public/design/topics.svg: one blank line
 * (1lh) between paragraphs, and a list sits straight under the line that
 * introduces it.
 */
const components: Components = {
  h2: ({ children }) => <h2 className="mt-[1lh] text-[1.3em] font-bold leading-tight text-brand-ink">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-[1lh] text-[1.15em] font-bold text-brand-ink">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-[1lh] font-bold text-brand-ink">{children}</h4>,
  p: ({ children }) => <p className="mt-[1lh] [h2+&]:mt-[0.4lh] [h3+&]:mt-[0.4lh] [h4+&]:mt-[0.4lh]">{children}</p>,
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
  ul: ({ children }) => <ul className="list-disc pl-[1.5em] [&_ul]:mt-0">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-[1.5em] marker:font-bold [&_ol]:mt-0">{children}</ol>,
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
    <div className="text-base leading-[1.25] text-brand-ink sm:text-lg lg:u-text-20 [&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
