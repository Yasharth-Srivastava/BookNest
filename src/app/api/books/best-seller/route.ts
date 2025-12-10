import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(){
    const user = await currentUser()
    if(!user){
        return NextResponse.json({message:"Unauthorized"})
    }

    const bestsellers = await db.select().from(books).orderBy(desc(books.sold)).limit(12)
    console.log(bestsellers)

    return NextResponse.json({bestSellers: bestsellers})
}