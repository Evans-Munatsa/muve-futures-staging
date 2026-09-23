import { RESOURCE_ARTICLES } from '@/constants';

/** A published blog post as the public site sees it. */
export interface PublicPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown. */
  body: string;
  category: string;
  tags: string[];
  coverImageUrl: string | null;
  coverImageAlt: string;
  authorName: string;
  /** ISO date. */
  publishedAt: string;
}

const SAMPLE_BODY = (summary: string) => `${summary}

Emotionally Based School Non-Attendance and SEND barriers call for a holistic rethink of the learning environment. When learners experience sensory overwhelm, neurodivergent fatigue or developmental trauma, expectations of immediate academic productivity can trigger distress.

## Start by reducing demand

Effective alternative provision begins by de-escalating demand. Unconditional positive regard, low-arousal physical spaces and transparent collaboration with parents and SENCOs are the foundation for progress.

## Build back gradually

Once emotional regulation is restored, small goals in literacy and numeracy can be layered in gradually, restoring confidence without reigniting avoidance.

> **Commissioning tip:** for advice on building these principles into an EHCP Section F provision or a Section 19 request, [contact our team](/contact).`;

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

/**
 * Sample posts built from the original Resources articles. Shown when there's
 * no database, and seeded as drafts-to-edit by `npm run db:seed`.
 */
export const DEFAULT_POSTS: PublicPost[] = RESOURCE_ARTICLES.map((article) => {
  const [month, year] = article.publishedDate.split(' ');
  return {
    slug: article.id,
    title: article.title,
    excerpt: article.summary,
    body: SAMPLE_BODY(article.summary),
    category: article.category,
    tags: article.tags,
    coverImageUrl: article.image,
    coverImageAlt: '',
    authorName: article.author,
    publishedAt: new Date(Date.UTC(Number(year), MONTHS[month] ?? 0, 1)).toISOString(),
  };
});

/** Rough reading time from the word count. */
export function readingTime(markdown: string): string {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
