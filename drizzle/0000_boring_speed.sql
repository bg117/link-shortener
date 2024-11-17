CREATE TABLE IF NOT EXISTS "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text,
	"url" text NOT NULL,
	"passphrase_hash" text NOT NULL,
	CONSTRAINT "links_slug_unique" UNIQUE("slug")
);
