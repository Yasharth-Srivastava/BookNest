CREATE TABLE "cart" (
	"cart_id" serial PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"book_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL
);
