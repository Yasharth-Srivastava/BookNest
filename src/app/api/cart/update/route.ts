import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db/db";
import { cart } from "@/schema/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest){
    const body = await request.json()
    const {quantity, cartId} = body.data
    console.log(quantity, cartId)

    const user = await currentUser()

    try{
        const existingCartItem = await db.select().from(cart).where(eq
            (cart.cartId, cartId)
        )
        console.log(existingCartItem)
        if(existingCartItem){
            await db.update(cart).set({qunatity: quantity}).where(eq(cart.cartId, cartId))
        }
        return NextResponse.json({message:"Done"})
    }catch(error){
        return NextResponse.json({message:"Error"})
    }


    return NextResponse.json({message:"Success"})
}