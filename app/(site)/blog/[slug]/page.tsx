import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Markdown } from '@/components/blog/Markdown';
import { formatPostDate } from '@/components/blog/PostCard';
import { ReferralButton, BookIntroButton } from '@/components/common/ActionButtons';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { getPublishedPost, getPublishedPosts } from '@/lib/content/queries';
import { readingTime } from '@/lib/content/posts';

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, alt: post.coverImageAlt }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="w-full bg-brand-green pb-20 sm:pb-28">
      <Stagger onLoad stagger={0.12} className="mx-auto w-[90%] max-w-3xl pt-10 pb-10 text-center text-white sm:pt-14">
        <StaggerItem>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
          </Link>
        </StaggerItem>
        {post.category && (
          <StaggerItem from="pop">
            <p className="mt-6 inline-block rounded-full border-[3px] border-white px-4 py-1 text-xs font-bold uppercase tracking-wide sm:text-sm">
              {post.category}
            </p>
          </StaggerItem>
        )}
        <StaggerItem>
          <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">{post.title}</h1>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-5 text-sm font-semibold sm:text-base">
            {[post.authorName, formatPostDate(post.publishedAt), readingTime(post.body)].filter(Boolean).join(' · ')}
          </p>
        </StaggerItem>
      </Stagger>

      <article className="mx-auto w-[90%] max-w-4xl overflow-hidden rounded-tr-[3rem] bg-white sm:rounded-tr-[5rem]">
        {post.coverImageUrl && (
          <Reveal onLoad from="fade" delay={0.3} className="relative aspect-[16/9]">
            <Image src={post.coverImageUrl} alt={post.coverImageAlt} fill priority sizes="(min-width: 896px) 896px, 90vw" className="object-cover" />
          </Reveal>
        )}
        <div className="px-6 py-10 sm:px-14 sm:py-14">
          {post.excerpt && <p className="text-lg font-semibold leading-relaxed text-brand-ink sm:text-xl">{post.excerpt}</p>}
          <div className="mt-8">
            <Markdown source={post.body} />
          </div>
          {post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2 border-t-2 border-brand-green pt-6" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-brand-lime px-3 py-1 text-xs font-bold text-brand-ink">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>

      <Reveal className="mx-auto mt-16 w-[90%] max-w-3xl text-center text-white">
        <h2 className="text-2xl font-bold sm:text-4xl">Talk to us about a learner</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-lg">
          Whether you&apos;re ready to refer or just want to talk things through, our team is here to help.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ReferralButton>Make a Referral</ReferralButton>
          <BookIntroButton variant="outline-white" className="border-[3px]">
            Book an Intro
          </BookIntroButton>
        </div>
      </Reveal>
    </div>
  );
}
