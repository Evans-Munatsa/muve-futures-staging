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

export interface GalleryImage {
  src: string;
  alt: string;
}

export const postStatus =pgEnum('post_status', ['draft', 'published']);

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
  /** Photos shown in the carousel under the post. */
  gallery: jsonb('gallery').$type<GalleryImage[]>().notNull().default([]),
  authorName: text('author_name').notNull().default(''),
  status: postStatus('status').notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const applicationStatus = pgEnum('application_status', ['new', 'reviewing', 'shortlisted', 'interview', 'offered', 'unsuccessful', 'withdrawn']);

/**
 * Job applications sent from /careers/[slug]. The vacancy itself lives in the
 * CMS (`vacancy:<slug>`), so its title is copied here in case it's later
 * renamed or deleted. CVs are private Vercel Blob files, only downloadable
 * through the dashboard.
 */
export const jobApplications = pgTable('job_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  /** Short code given to the applicant, e.g. MF-C-4K7Q2P. */
  reference: text('reference').notNull().unique(),
  vacancySlug: text('vacancy_slug').notNull(),
  vacancyTitle: text('vacancy_title').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  location: text('location').notNull().default(''),
  rightToWork: text('right_to_work').notNull(),
  coverLetter: text('cover_letter').notNull().default(''),
  heardAbout: text('heard_about').notNull().default(''),
  /** Private blob pathname, and the file name the applicant uploaded. */
  cvPathname: text('cv_pathname').notNull(),
  cvFileName: text('cv_file_name').notNull(),
  cvContentType: text('cv_content_type').notNull(),
  status: applicationStatus('status').notNull().default('new'),
  /** Internal notes from the team; never shown to the applicant. */
  notes: text('notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** The website forms that feed the dashboard Inbox (job applications have their own table). */
export const formKind = pgEnum('form_kind', ['contact', 'referral', 'partnership', 'book-intro', 'feedback']);
export const submissionStatus = pgEnum('submission_status', ['open', 'resolved', 'archived']);

/** A labelled answer, grouped into the form's sections so any form can be shown in the Inbox. */
export interface SubmissionSection {
  title: string;
  fields: { label: string; value: string }[];
}

/** One message sent through a website form. */
export const formSubmissions = pgTable('form_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  form: formKind('form').notNull(),
  /** Given to the sender, e.g. MF-R-7KQ2XP. */
  reference: text('reference').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull().default(''),
  /** One line for the inbox list. */
  subject: text('subject').notNull(),
  answers: jsonb('answers').$type<SubmissionSection[]>().notNull(),
  status: submissionStatus('status').notNull().default('open'),
  /** Set the first time someone opens it in the dashboard. */
  readAt: timestamp('read_at', { withTimezone: true }),
  notes: text('notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Newsletter sign-ups from the footer and the coming-soon page. */
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  /** Where they signed up, e.g. footer or coming-soon. */
  source: text('source').notNull().default('footer'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type JobApplication = typeof jobApplications.$inferSelect;
export type ApplicationStatus = (typeof applicationStatus.enumValues)[number];
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type FormKind = (typeof formKind.enumValues)[number];
export type SubmissionStatus = (typeof submissionStatus.enumValues)[number];
