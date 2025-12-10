"use server";

import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const bookSchema = z.object({
  bookName: z.string().min(1),
  bookAuthor: z.string().min(1),
  bookDescription: z.string().min(1),
  price: z.coerce.number().min(1),
  stock: z.coerce.number().min(1),
  bookImage: z.string().min(1),
  bookGenre: z.string().min(1)
});

export async function createBook(prev: any, formData: FormData) {
  const { userId } = await auth();
  if (!userId) return { message: "Unauthorized" };

  const data = {
    bookName: formData.get("bookname"),
    bookAuthor: formData.get("authorname"),
    bookDescription: formData.get("bookdescription"),
    price: formData.get("bookprice"),
    stock: formData.get("stock"),
    bookImage: formData.get("bookurl"),
    bookGenre: formData.get("genre")
  };

  const result = bookSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return { message: "Invalid Data. All fields are required" };
  }

  try {
    await db.insert(books).values({
      bookName: result.data.bookName,
      bookAuthor: result.data.bookAuthor,
      bookDescription: result.data.bookDescription,
      bookImage: result.data.bookImage,
      bookGenre: result.data.bookGenre.split(",").map((g) => g.trim()),
      price: result.data.price,
      stock: result.data.stock
    });

    return { message: "Added Successfully" };
  } catch (error) {
    console.log("Error occurred:", error);
    return { message: "Failed to add book" };
  }
}
