import Image from 'next/image';
import Link from 'next/link';
import { Tilt } from '@/components/motion/Tilt';
import type { PublicPost } from '@/lib/content/posts';

export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** A blog post teaser on the Topics page. Sizes from lg up are the design's (public/design/topics.svg). */
export function PostCard({ post, readMore }: { post: PublicPost; readMore: string }) {
  // The article opens below the grid, so jump straight to it.
  const href = `/blog/${post.slug}#article`;

  return (
    <Tilt
      as="article"
      max={5}
      className="group flex h-full w-full flex-col overflow-hidden rounded-tr-[4rem] bg-white text-brand-teal lg:u-rounded-tr-80"
    >
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[378/255] shrink-0 overflow-hidden bg-brand-lime">
        {post.coverImageUrl && (
          <Image
            src={post.coverImageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col px-6 pt-5 pb-6 lg:u-px-28 lg:u-pt-23 lg:u-pb-28">
        <h3 className="text-lg font-medium leading-[1.14] lg:u-text-22">
          <Link href={href} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="mt-6 line-clamp-4 text-xs leading-[1.15] lg:u-mt-30 lg:u-text-13">{post.excerpt}</p>
        <div className="mt-auto pt-6 lg:u-pt-27">
          <Link
            href={href}
            aria-label={`${readMore}: ${post.title}`}
            className="inline-flex h-8 w-36 items-center justify-center rounded-full bg-brand-teal text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-teal/90 hover:shadow-lg lg:u-h-30 lg:u-w-154 lg:u-text-16"
          >
            {readMore}
          </Link>
        </div>
      </div>
    </Tilt>
  );
}
