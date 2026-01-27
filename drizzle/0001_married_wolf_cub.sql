ALTER TABLE "post" ALTER COLUMN "show" SET DEFAULT 'null'::jsonb;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "show" DROP NOT NULL;