import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"

const booksType = z.object({
    bookName: z.string(),
    bookAuthor: z.string(),
    bookDescription: z.string(),
    bookImage: z.string(),
    stock: z.coerce.number()
})

export async function PATCH(request: NextRequest){
    const body = await request.json()
    const {id, formData} = body

    const result = booksType.safeParse(formData)

    if(!result.success){
        console.log("Update Failed")
        return NextResponse.json({message:"Invalid Fields"})
    }

    const parsedData = result.data

    await db.update(books).set({
        bookName: parsedData.bookName,
        bookAuthor: parsedData.bookAuthor,
        bookDescription: parsedData.bookDescription,
        bookImage: parsedData.bookImage,
        stock: parsedData.stock
    }).where(eq(books.bookId, id))

    return NextResponse.json({message:"Updated Successfully"})
}