import { db } from "@/db/db";
import { books, cart } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user?.id) {
    return NextResponse.json({ message: "Not Logged In" });
  }

  try {
    const cartItems = await db
      .select({
        id: cart.cartId,
        userId: cart.clerkId,
        bookId: cart.bookId,
        quantity: cart.qunatity,
        bookName: books.bookName,
        bookImage: books.bookImage,
        price: books.price,
        bookAuthor: books.bookAuthor,
        stock: books.stock
      })
      .from(cart)
      .innerJoin(books, eq(cart.bookId, books.bookId))
      .where(eq(cart.clerkId, user.id));
      
    return NextResponse.json({
      message: "Data Fetched Successful",
      data: cartItems,
    });
  } catch (error) {
    console.log("Some error occured", error);
  }
  return NextResponse.json({ message: "Error fetching cart" });
}
