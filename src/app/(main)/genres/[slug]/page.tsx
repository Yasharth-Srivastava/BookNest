"use server"
import { db } from "@/db/db";
import { books } from "@/schema/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { BookOpen } from "lucide-react"; 


export default async function GenrePage({ params }:  {
  params: { slug: string };
}) {
  const { slug } =  params;
  const decodedSlug = decodeURIComponent(slug);

  const capitalizedSlug = decodedSlug
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const genreBooks = await db
    .select()
    .from(books)
    .where(sql`${capitalizedSlug} = ANY(${books.bookGenre})`);

  return (
    <div className="w-full min-h-screen bg-stone-50 px-6 pt-32 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      
      <div className="max-w-4xl mx-auto text-center mb-16 border-b border-stone-200 pb-10">
        <p className="text-emerald-800 font-bold tracking-widest uppercase text-sm mb-3">
          Curated Collection
        </p>
        
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
          {capitalizedSlug}
        </h1>

        <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Discover our hand-picked selection of 
          <span className="font-semibold text-stone-800"> {capitalizedSlug} </span> 
          titles. From timeless classics to the latest bestsellers.
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
        {genreBooks.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-stone-100 rounded-lg border border-stone-200 border-dashed">
            <BookOpen size={48} className="text-stone-300 mb-4" />
            <p className="text-stone-500 text-lg font-serif italic">
              We are currently stocking our {capitalizedSlug} shelves.
              <br /> Check back soon.
            </p>
          </div>
        ) : (
          genreBooks.map((book) => (
            <Link
              key={book.bookId}
              href={`/books/details/${encodeURIComponent(book.bookName)}`}
              className="group flex flex-col gap-4"
            >
              <div className="
                  relative w-full aspect-[2/3] 
                  bg-stone-200 rounded-sm shadow-md 
                  overflow-hidden
                  group-hover:shadow-xl group-hover:shadow-stone-900/20 
                  group-hover:-translate-y-1 
                  transition-all duration-300 ease-out
                "
              >
                <img
                  src={book.bookImage}
                  alt={book.bookName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="
                    font-serif font-bold text-lg text-stone-900 leading-tight mb-1
                    group-hover:text-emerald-800 transition-colors
                    line-clamp-2
                  "
                >
                  {book.bookName}
                </h2>
                <p className="text-stone-500 text-sm font-medium mb-2">
                  {book.bookAuthor}
                </p>
                <span className="
                    inline-block text-xs font-bold text-emerald-800 uppercase tracking-wider
                    border-b border-emerald-200 pb-0.5
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  "
                >
                  View Details
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}