import { db } from "@/db/db";
import { books, cart } from "@/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const {bookId} = await body

    
}