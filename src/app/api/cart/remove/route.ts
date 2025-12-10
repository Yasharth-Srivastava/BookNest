
import { db } from "@/db/db";
import { cart } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const user  = await currentUser()
    const { cartId }= await request.json()

    if(!user?.id){
        return NextResponse.json({message:"Not Logged In"})
    }
    try{
        const result = await db.delete(cart).where(
            and(
                eq(cart.cartId, cartId),
                eq(cart.clerkId, user.id)
            )
        )
        return NextResponse.json({ success: true })
    }catch(error){
        console.log(error)
    }
}