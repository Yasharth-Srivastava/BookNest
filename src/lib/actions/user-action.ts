import { db } from "@/db/db";
import { profile } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function onBoardUser(){
    const clerkUser = await currentUser()
    if(!clerkUser){
        return NextResponse.json({message:"Unauthorized User"}, {status:500})
    }

    const existingUser = await db.select().from(profile).where(eq(profile.clerkId, clerkUser.id))
    if(existingUser.length>0){
        return NextResponse.json("User Exists")
    }

    console.log(existingUser)

    const email = clerkUser.emailAddresses[0].emailAddress

    try{
        await db.insert(profile).values({
            clerkId:clerkUser.id,
            firstName:clerkUser.firstName,
            lastName:clerkUser.lastName,
            email: email,
        })
    }catch(error){
        console.log(error)
    }
}
