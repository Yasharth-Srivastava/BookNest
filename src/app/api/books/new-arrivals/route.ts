import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    try{
        const newArrivals = await db.select().from(books).orderBy(desc(books.createdAt)).limit(8)
        return NextResponse.json({newArrivals:newArrivals})
    }catch(error){

    }
}