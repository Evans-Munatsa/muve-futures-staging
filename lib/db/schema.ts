import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/** People who can sign in to /admin. Passwords are bcrypt hashes, never plain text. */
export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  /** Consecutive failed logins; reset on success. */
  failedLogins: integer('failed_logins').notNull().default(0),
  /** Sign-in is refused until this time after too many failures. */
  lockedUntil: timestamp('locked_until', { withTimezone: true }),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Editable website content. One JSON document per page or item, identified by
 * a key such as `home`, `settings`, `service:eotas` or `legal:privacy-policy`.
 * The shape of each document is described in lib/content/registry.ts; pages
 * fall back to the built-in defaults when a key has no row.
 */
export const content = pgTable('content', {
  key: text('key').primaryKey(),
  data: jsonb('data').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  updatedBy: uuid('updated_by').references(() => adminUsers.id, { onDelete: 'set null' }),
});

export const postStatus = pgEnum('post_status', ['draft', 'published']);

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull().default(''),
  /** Markdown. */
  body: text('body').notNull().default(''),
  category: text('category').notNull().default(''),
  tags: text('tags').array().notNull().default([]),
  coverImageUrl: text('cover_image_url'),
  coverImageAlt: text('cover_image_alt').notNull().default(''),
  authorName: text('author_name').notNull().default(''),
  status: postStatus('status').notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
