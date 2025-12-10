import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json()
    const {id} = body
    console.log(id)
    const product = await db.select().from(books).where(eq(books.bookId, id))
    console.log(product)

    return NextResponse.json({product: product})
}