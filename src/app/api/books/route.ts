import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const allProducts = await db.select().from(books);

  return NextResponse.json({ allProducts });
}
