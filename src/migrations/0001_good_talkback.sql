CREATE TABLE "books" (
	"book_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"book_name" text NOT NULL,
	"book_author" text NOT NULL,
	"book_description" text NOT NULL,
	"book_image" text NOT NULL,
	"book_genre" text[] NOT NULL,
	"price" numeric NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
