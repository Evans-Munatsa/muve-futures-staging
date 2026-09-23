import { Markdown } from '@/components/blog/Markdown';
import { formatPostDate } from '@/components/blog/PostCard';
import { PostGallery } from '@/components/blog/PostGallery';
import { TopicGrid } from '@/components/blog/TopicGrid';
import { Lines } from '@/components/common/Lines';
import { Reveal } from '@/components/motion/Reveal';
import type { BlogPageContent } from '@/lib/content/pages';
import type { PublicPost } from '@/lib/content/posts';

interface TopicsPageProps {
  content: BlogPageContent;
  posts: PublicPost[];
  /** The post open in the article panel under the grid. */
  article?: PublicPost;
  /** The article panel's title is the page's main heading on a post's own page. */
  articleIsPage?: boolean;
}

/**
 * The Topics (blog) page from public/design/topics.svg: heading, topic filters
 * and cards, then the open article and its photo gallery. From lg up, sizes and
 * spacing are the design's (u-* units are design pixels).
 */
export function TopicsPage({ content, posts, article, articleIsPage = false }: TopicsPageProps) {
  const ArticleHeading = articleIsPage ? 'h1' : 'h2';
  const PageHeading = articleIsPage ? 'p' : 'h1';

  return (
    <div className="w-full overflow-hidden bg-brand-green pb-20 sm:pb-28 lg:u-pb-280">
      <Reveal onLoad className="relative z-20 mx-auto w-[90%] pt-12 pb-10 text-center sm:pt-20 sm:pb-14 lg:u-pt-105 lg:u-pb-82">
        <PageHeading className="text-3xl font-bold leading-[1.19] tracking-tight text-white sm:text-5xl lg:u-text-95">
          <Lines text={content.hero.title} />
        </PageHeading>
      </Reveal>

      <TopicGrid content={content} posts={posts} />

      {article && (
        <>
          <Reveal className="relative z-20 mx-auto mt-16 w-[90%] lg:u-mt-87 lg:u-w-1572">
            <article
              id="article"
              className="scroll-mt-24 rounded-[2.5rem] bg-white px-6 py-10 sm:rounded-[4rem] sm:px-16 sm:py-14 lg:u-rounded-100 lg:u-pt-60 lg:u-pr-67 lg:u-pb-60 lg:u-pl-81"
            >
              <header className="flex flex-col-reverse gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                <ArticleHeading className="max-w-2xl text-2xl font-bold leading-[1.17] tracking-tight text-brand-ink sm:text-4xl lg:u-max-w-800 lg:u-text-48">
                  {article.title}
                </ArticleHeading>
                <time dateTime={article.publishedAt} className="shrink-0 text-base font-bold text-brand-ink sm:text-2xl lg:u-text-30">
                  {formatPostDate(article.publishedAt)}
                </time>
              </header>
              <div className="mt-8 sm:mt-10 lg:u-mt-48 lg:u-pr-10">
                <Markdown source={article.body} />
              </div>
            </article>
          </Reveal>

          <PostGallery images={article.gallery} title={article.title} />
        </>
      )}
    </div>
  );
}
