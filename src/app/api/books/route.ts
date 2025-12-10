import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    const user = await currentUser()
    if(!user) return null

    const allProducts = await db.select().from(books)
    console.log(allProducts)
    return NextResponse.json({allProducts:allProducts})
}