import { db } from "@/db/db"
import { books, cart, orders } from "@/schema/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(request: NextRequest){
    try{
        const user = await currentUser()
        if(!user){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const cartItems = await db.select({
            price: books.price,
            quantity: cart.qunatity,
            title: books.bookName,
            id: books.bookId,
            name: books.bookName,
            img:books.bookImage,
            stock: books.stock
        }).from(cart).innerJoin(books, eq(cart.bookId, books.bookId)).where(eq(cart.clerkId, user.id))

        if (cartItems.length === 0) {
            return new NextResponse("Cart is empty", { status: 400 });
        }

        const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
        const payment_capture = 1
        const amountInPaise = (totalAmount + 5) * 100
        const currency = "INR"

        const options = {
            amount: amountInPaise.toString(),
            currency,
            receipt: `receipt_${Date.now()}`,
            payment_capture
        }

        const razorpayOrder = await razorpay.orders.create(options)

        await db.insert(orders).values({
            clerkId: user.id,
            amount: amountInPaise,
            status:'pending',
            razorpayOrderId: razorpayOrder.id,
            items:cartItems

        })

        return NextResponse.json({
            id: razorpayOrder.id,
            currency: razorpayOrder.currency,
            amount: razorpayOrder.amount,
    });

    }catch(error){
        console.error("Error creating Razorpay order:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}