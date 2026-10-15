import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/*
 * Policy text in the policy page design: white on the page green, headings
 * sitting straight on their first paragraph, a blank line between
 * paragraphs, and lists directly under the line that introduces them.
 * From lg up, sizes are design pixels (u-* units). Raw HTML is ignored.
 */
const components: Components = {
  h2: ({ children }) => <h2 className="mt-[1.4lh] text-[1.36em] font-bold leading-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-[1lh] text-[1.12em] font-bold leading-tight">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-[1lh] font-bold">{children}</h4>,
  p: ({ children }) => <p className="mt-[1lh] [h2+&]:mt-0 [h3+&]:mt-0 [h4+&]:mt-0">{children}</p>,
  a: ({ href = '', children }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} className="font-semibold underline decoration-2 underline-offset-2 hover:text-brand-ink" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="list-disc pl-[1.1em] marker:text-[0.8em] [h2+&]:mt-0 [h3+&]:mt-0 [&_ul]:mt-0">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-[1.4em] [h2+&]:mt-0 [h3+&]:mt-0 [&_ol]:mt-0">{children}</ol>,
  li: ({ children }) => <li className="pl-[0.3em]">{children}</li>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  img: ({ src, alt }) => (
    // Diagrams are small and can be uploaded from anywhere, so a plain <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} loading="lazy" decoding="async" className="mt-[1.4lh] block w-full max-w-[1100px] lg:max-w-none lg:u-w-1100" />
  ),
  hr: () => <hr className="my-[1.4lh] border-white/50" />,
  table: ({ children }) => (
    <div className="mt-[1.6lh] mb-[0.6lh] overflow-x-auto">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="px-[0.8em] py-[0.5em] align-top font-bold uppercase">{children}</th>,
  td: ({ children }) => <td className="px-[0.8em] py-[0.5em] align-top">{children}</td>,
  tr: ({ children }) => <tr className="[tbody>&:nth-child(odd)]:bg-white/20">{children}</tr>,
  code: ({ children }) => <code className="rounded bg-white/20 px-1.5 py-0.5 text-[0.9em]">{children}</code>,
};

export function PolicyMarkdown({ source }: { source: string }) {
  return (
    <div className="text-sm leading-[1.25] text-white sm:text-base lg:u-text-25 [&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
