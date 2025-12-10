CREATE TABLE "orders" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"amount" integer NOT NULL,
	"status" text DEFAULT 'pending',
	"rzorpay_order_id" text,
	"items" json,
	"created_at" timestamp DEFAULT now()
);
