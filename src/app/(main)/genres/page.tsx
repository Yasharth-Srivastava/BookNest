"use client";
import { genres } from "@/lib/data/genres";
import Link from "next/link";


export default function GenresPage() {
  return (
    <div className="w-full min-h-screen bg-stone-50 px-6 pt-32 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
          Browse by Genre
        </h1>
        <p className="text-stone-500 max-w-lg mx-auto">
          Explore our shelves. From the depths of history to the edges of the universe.
        </p>
      </div>

      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          gap-6
          max-w-6xl mx-auto
        "
      >
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="
              group
              relative
              bg-white
              border border-stone-200 
              rounded-lg
              flex items-center justify-center
              text-center
              font-serif font-medium 
              text-lg text-stone-700
              
              shadow-sm shadow-stone-900/5
              transition-all duration-300
              
              hover:shadow-xl hover:shadow-stone-900/10
              hover:border-emerald-200
              hover:-translate-y-1 
              hover:text-emerald-900
              cursor-pointer
              capitalize
            "
          >

            <Link 
                href={`/genres/${genre.name}`} 
                className="w-full h-full p-8 flex items-center justify-center"
            >
                {genre.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}