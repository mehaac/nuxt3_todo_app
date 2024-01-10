ALTER TABLE "task" ALTER COLUMN "created_at" SET DATA TYPE timestamp(3) with time zone;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "updated_at" SET DATA TYPE timestamp(3) with time zone;