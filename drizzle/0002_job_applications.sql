CREATE TYPE "public"."application_status" AS ENUM('new', 'reviewing', 'shortlisted', 'interview', 'offered', 'unsuccessful', 'withdrawn');--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference" text NOT NULL,
	"vacancy_slug" text NOT NULL,
	"vacancy_title" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"right_to_work" text NOT NULL,
	"cover_letter" text DEFAULT '' NOT NULL,
	"heard_about" text DEFAULT '' NOT NULL,
	"cv_pathname" text NOT NULL,
	"cv_file_name" text NOT NULL,
	"cv_content_type" text NOT NULL,
	"status" "application_status" DEFAULT 'new' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "job_applications_reference_unique" UNIQUE("reference")
);
