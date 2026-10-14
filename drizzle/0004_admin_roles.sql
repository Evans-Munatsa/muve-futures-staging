CREATE TYPE "public"."admin_role" AS ENUM('super_admin', 'manager');--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "role" "admin_role" DEFAULT 'manager' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "permissions" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
-- Everyone who could sign in before roles existed had full access; keep it that way.
UPDATE "admin_users" SET "role" = 'super_admin';