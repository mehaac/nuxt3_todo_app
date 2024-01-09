DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('todo', 'in-progress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"text" varchar(255) NOT NULL,
	"priority" smallint NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp (3) with time zone NOT NULL,
	"updated_at" timestamp (3) with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
