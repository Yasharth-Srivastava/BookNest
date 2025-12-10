import { db } from "@/db/db";
import { books, cart } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await currentUser();
  const data = await request.json();
  const res = data.data;

  try {
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" });
    }
    await db.insert(cart).values({
      clerkId: res.userId,
      bookId: res.bookId,
      qunatity: res.quantity,
    });

    return NextResponse.json({ message: "Item Added To Cart Successfully" });
  } catch (error) {
    console.log("Some error occured", error);
  }

  return NextResponse.json({ message: "Done" });
}
