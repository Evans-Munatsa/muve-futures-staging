import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Tilt } from '@/components/motion/Tilt';
import { readingTime, type PublicPost } from '@/lib/content/posts';

export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** A blog post teaser, used on /blog and in the Resources guides library. */
export function PostCard({ post }: { post: PublicPost }) {
  return (
    <Tilt as="article" max={5} className="group flex h-full w-full flex-col overflow-hidden rounded-tr-[2.5rem] bg-white text-brand-ink shadow-sm">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-lime">
          {post.coverImageUrl && (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {post.category && (
            <span className="absolute top-3 left-3 rounded-full bg-brand-ink px-3 py-1 text-[11px] font-bold text-white">{post.category}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {readingTime(post.body)} · {formatPostDate(post.publishedAt)}
          </p>
          <h3 className="mt-2 text-lg font-bold leading-snug transition-colors group-hover:text-brand-orange">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
          <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-bold text-brand-orange">
            Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Tilt>
  );
}
