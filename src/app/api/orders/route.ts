import { db } from "@/db/db";
import { orders } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(){
    const user = await currentUser()

    if(!user){
        return NextResponse.json({
            message: "Unauthorized User"
        })
    }

    try {
        const orderHistory = await db.select({
            id: orders.orderId,
            amount: orders.amount,
            status: orders.status,
            items: orders.items
        }).from(orders).where(eq(orders.clerkId, user.id))

        return NextResponse.json({orderHistory: orderHistory})
    } catch (error) {
        
    }
}