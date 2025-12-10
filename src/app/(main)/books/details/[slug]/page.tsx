"use server"

import AddToCart from "@/components/AddToCart";
import BuyNow from "@/components/BuyNow";
import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";


interface PageProps {
  params: Promise<{ slug: string }>;
}


export default async function BookDetailsPage({ params }: PageProps) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const bookDetails = await db
    .select()
    .from(books)
    .where(eq(books.bookName, decodedSlug));

  const book = bookDetails[0];

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <Link 
            href="/genres" 
            className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
            
              <div className="absolute top-2 left-2 w-full h-full bg-stone-200 rounded-r-md rounded-l-sm border border-stone-300 -z-10"></div>
              
              <img
                src={book.bookImage}
                alt={book.bookName}
                className="
                  w-full h-auto object-cover 
                  rounded-r-md rounded-l-sm 
                  shadow-2xl shadow-stone-900/20 
                  border-l-4 border-stone-100/20
                "
              />
            </div>
          </div>

         
          <div className="lg:col-span-7 flex flex-col h-full">
            
            <div className="border-b border-stone-200 pb-6 mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 leading-tight mb-4">
                {book.bookName}
              </h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-lg md:text-xl text-stone-600 font-medium">
                  By <span className="text-stone-900 underline decoration-stone-300 underline-offset-4">{book.bookAuthor}</span>
                </h2>
                
                <div className={`
                    flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border
                    ${book.stock > 0 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-red-50 text-red-800 border-red-200'}
                  `}
                >
                  {book.stock > 0 ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{book.stock > 0 ? `${book.stock} Copies in Stock` : 'Out of Stock'}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
               <span className="text-4xl font-serif font-semibold text-stone-900">
                 ₹{book.price}
               </span>
            </div>

            <div className="prose prose-stone prose-lg text-stone-600 leading-relaxed mb-10 max-w-none">
              <p>{book.bookDescription}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-stone-200">
               <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <div className="flex-1 min-w-[160px]">
                    <AddToCart bookId={book.bookId} availableStock={book.stock} />
                  </div>
                  <div className="flex-1 min-w-[160px]">
                     <BuyNow bookId={book.bookId} userId={user?.id} availableStock={book.stock} />
                  </div>
               </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}