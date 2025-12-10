import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const {query} = await body
        console.log(query)

        const searchPatterns = await db.select({
            id:books.bookId,
            name:books.bookName
        }).from(books).where(sql`${books.bookName} ILIKE ${ query + '%'}`);
        console.log(searchPatterns)
        return NextResponse.json({message:"Search", searchQueries: searchPatterns})
    } catch (error) {
        
    }
}