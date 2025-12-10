"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Book {
  bookId: string;
  bookName: string;
  bookImage: string;
}

const NewArrivals = () => {
  const [newBooksArrivals, setNewBooksArrivals] = useState<Book[]>([]);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        const response = await axios.get("/api/books/new-arrivals");
        setNewBooksArrivals(response.data.newArrivals);
      } catch (error) {
        console.error("Failed to fetch new arrivals", error);
      }
    }
    fetchNewArrivals();
  }, []);

  const moveRight = () => {
    setNewBooksArrivals((prev) => {
      if (prev.length === 0) return prev;
      const rearranged = [...prev];
      const first = rearranged.shift();
      if (first) rearranged.push(first);
      return rearranged;
    });
  };

  const moveLeft = () => {
    setNewBooksArrivals((prev) => {
      if (prev.length === 0) return prev;
      const rearranged = [...prev];
      const last = rearranged.pop();
      if (last) rearranged.unshift(last);
      return rearranged;
    });
  };

  return (
    <section className="w-full bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <div className="text-center sm:text-left">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Fresh from the Press
            </h2>
            <p className="mt-2 text-stone-500 text-sm md:text-base">
              The latest stories hitting our shelves this week.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={moveLeft}
              className="
                p-3 rounded-full border border-stone-300 
                text-stone-600 hover:text-stone-900
                hover:bg-stone-200 hover:border-stone-400
                transition-all duration-300 
                focus:outline-none active:scale-95
              "
              aria-label="Previous items"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={moveRight}
              className="
                p-3 rounded-full border border-stone-300 
                text-stone-600 hover:text-stone-900
                hover:bg-stone-200 hover:border-stone-400
                transition-all duration-300 
                focus:outline-none active:scale-95
              "
               aria-label="Next items"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
            <div className="
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
                gap-6 md:gap-8 w-full
              "
            >
              {newBooksArrivals.length > 0 ? (
                newBooksArrivals.slice(0, 6).map((book) => (
                  <Link
                    key={book.bookId}
                    href={`/books/details/${encodeURIComponent(book.bookName)}`}
                    className="group block"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="
                          relative w-full aspect-[2/3] 
                          overflow-hidden rounded-md 
                          bg-stone-200 shadow-md 
                          group-hover:shadow-xl group-hover:shadow-stone-900/20
                          group-hover:-translate-y-1
                          transition-all duration-300 ease-out
                        "
                      >
                        <img
                          src={book.bookImage}
                          alt={book.bookName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                      </div>

                      <div className="text-center sm:text-left space-y-1 px-1">
                        <h3 className="
                            font-medium text-stone-900 text-sm leading-tight
                            group-hover:text-emerald-800 group-hover:underline decoration-emerald-800/30
                            transition-colors
                            line-clamp-2 min-h-[2.5em]
                          "
                        >
                          {book.bookName}
                        </h3>
                        <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                          New Arrival
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-stone-100 rounded-lg border border-stone-200 border-dashed">
                  <p className="text-stone-500 text-lg font-serif italic">
                    Our shelves are currently being stocked...
                  </p>
                </div>
              )}
            </div>
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;