
import { decimal, integer, serial, numeric, pgTable, text, timestamp, uuid, json } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
    userId:uuid("user_id").defaultRandom().primaryKey(),
    clerkId:text("clerk_id").unique().notNull(),
    email:text("email").notNull(),
    firstName:text("firstName"),
    lastName:text("lastName"),
    role:text("role").default("user"),
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().notNull()
})

export const books = pgTable("books",{
    bookId:uuid("book_id").defaultRandom().primaryKey(),
    bookName:text("book_name").notNull(),
    bookAuthor:text("book_author").notNull(),
    bookDescription:text("book_description").notNull(),
    bookImage:text("book_image").notNull(),
    bookGenre:text("book_genre").array().notNull(),
    price:integer("price").notNull(),
    stock:integer("stock").default(0).notNull(),
    sold:integer("sold").default(0).notNull(),
    createdAt:timestamp("created_at").defaultNow().notNull()
})

export const cart = pgTable("cart",{
    cartId: serial("cart_id").primaryKey(),
    clerkId: text("clerk_id").notNull(),
    bookId: uuid("book_id").notNull(),
    qunatity: integer("quantity").default(1).notNull()
})

export const orders = pgTable("orders", {
    orderId: serial("order_id").primaryKey(),
    clerkId: text("clerk_id").notNull(), 
    amount: integer("amount").notNull(),
    status: text("status").default("pending"),
    razorpayOrderId: text("rzorpay_order_id"),
    items: json("items"),
    createdAt: timestamp("created_at").defaultNow()
})