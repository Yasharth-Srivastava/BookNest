import { NextResponse } from "next/server";
import crypto from "crypto"; 
import { db } from "@/db/db";
import { orders, cart, books } from "@/schema/schema";
import { eq, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const user = await currentUser();
  
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const textToHash = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(textToHash)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
       return NextResponse.json({ success: false }, { status: 400 });
    }
    
    console.log("Payment Verified! Processing order...");

    
        // 1. Update Order Status
        await db
        .update(orders)
        .set({ status: "paid" })
        .where(eq(orders.razorpayOrderId, razorpay_order_id));

        if(user){
          // 2. Fetch Cart Items
          const userCartItems = await db
            .select()
            .from(cart)
            .where(eq(cart.clerkId, user.id));

          // 3. Update Stock
          for(const item of userCartItems){
            await db
              .update(books)
              .set({
                // MATCHING YOUR SCHEMA:
                // Your schema defines the key as 'qunatity', so we must use 'item.qunatity'
                stock: sql`${books.stock} - ${item.qunatity}`,
                sold: sql`${books.sold} + ${item.qunatity}`
              })
              // MATCHING YOUR SCHEMA:
              // Your schema uses 'bookId', not 'id'
              .where(eq(books.bookId, item.bookId)); 
          }
          
          // 4. Clear Cart
          await db.delete(cart).where(eq(cart.clerkId, user.id));
        }

      return NextResponse.json({ message: "success" });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}