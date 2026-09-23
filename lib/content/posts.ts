import { RESOURCE_ARTICLES } from '@/constants';
import type { GalleryImage } from '@/lib/db/schema';

export type { GalleryImage };

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
  /** Photos in the carousel under the post. */
  gallery: GalleryImage[];
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

/** Site photos used for the sample galleries. */
const SAMPLE_GALLERY: GalleryImage[] = [
  { src: '/images/students-studying.webp', alt: 'Group of students talking together around a table with a laptop and notebooks' },
  { src: '/images/three-girls-classroom.webp', alt: 'Three young girls working together at a classroom table' },
  { src: '/images/students-tablet.webp', alt: 'Students gathered around a tablet with their teacher' },
  { src: '/images/teen-friends.webp', alt: 'Group of smiling teenage friends outdoors' },
  { src: '/images/classroom-girl.webp', alt: 'Girl smiling at her desk in a classroom' },
];

/** The article shown in the Topics page design (public/design/topics.svg). */
const EBSNA_SIGNS: PublicPost = {
  slug: 'what-is-ebsna',
  title: 'What is EBSNA and how can you recognise the signs?',
  excerpt:
    'Practical guidance, expert insight and helpful resources for families, schools and professionals supporting children and young people with additional needs.',
  body: `Emotionally Based School Non-Attendance, often shortened to EBSNA, describes difficulty attending school because of emotional distress. It may be linked to anxiety, sensory overwhelm, unmet SEND needs, bullying, trauma or difficulties within the school environment.\\
EBSNA is not simply a child refusing to attend or behaving badly. For some children, the thought of school can create a level of distress that feels impossible to manage.

**Signs to look out for**\\
A child experiencing EBSNA may:
- Feel anxious or distressed before school
- Regularly complain of headaches, stomach aches or feeling unwell
- Struggle to sleep before school days
- Become upset on Sunday evenings or after school holidays
- Frequently arrive late, miss lessons or ask to go home
- Experience emotional outbursts, shutdowns or panic
- Attend some days but find it difficult to remain consistent
- Appear exhausted after masking their distress at school
- Become increasingly withdrawn or lose confidence
- Say they feel unsafe, overwhelmed or unable to cope

These signs can look different for every child. Some may communicate their feelings clearly, while others may show distress through changes in behaviour, mood or physical health.`,
  category: 'EBSNA & Attendance',
  tags: ['EBSNA', 'Attendance', 'Families', 'Anxiety'],
  coverImageUrl: '/images/students-studying.webp',
  coverImageAlt: SAMPLE_GALLERY[0].alt,
  gallery: SAMPLE_GALLERY,
  authorName: 'MUVE Futures',
  publishedAt: new Date(Date.UTC(2026, 2, 8)).toISOString(),
};

/**
 * Sample posts: the design's article plus the original Resources articles.
 * Shown when there's no database, and seeded by `npm run db:seed`.
 */
export const DEFAULT_POSTS: PublicPost[] = [
  EBSNA_SIGNS,
  ...RESOURCE_ARTICLES.map((article, i) => {
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
      // Each sample starts its gallery on a different photo.
      gallery: [...SAMPLE_GALLERY.slice(i + 1), ...SAMPLE_GALLERY.slice(0, i + 1)],
      authorName: article.author,
      publishedAt: new Date(Date.UTC(Number(year), MONTHS[month] ?? 0, 1)).toISOString(),
    };
  }),
];

/** Rough reading time from the word count. */
export function readingTime(markdown: string): string {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
