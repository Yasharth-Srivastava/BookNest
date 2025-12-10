"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const Bestseller = () => {
  const [bestSellBooks, setBestSellBooks] = useState([]);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    async function bestSells() {
      try {
        const result = await axios.get("/api/books/best-seller");
        const data = await result.data.bestSellers;
        setBestSellBooks(data);
      } catch (error) {
        console.error("Error fetching bestsellers", error);
      }
    }
    bestSells();
  }, []);

  const moveRight = () => {
    setBestSellBooks((prev) => {
      if (prev.length === 0) return prev;
      const rearranged = [...prev];
      const first = rearranged.shift();
      if (first) rearranged.push(first);
      return rearranged;
    });
  };

  const moveLeft = () => {
    setBestSellBooks((prev) => {
      if (prev.length === 0) return prev;
      const rearranged = [...prev];
      const last = rearranged.pop();
      if (last) rearranged.unshift(last);
      return rearranged;
    });
  };

  return (
    <section className="w-full bg-stone-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Bestsellers
            </h2>
            <p className="mt-2 text-stone-600 max-w-lg hidden sm:block">
              Top-rated reads that everyone is talking about.
            </p>
          </div>
          {isSignedIn && (
            <div className="flex items-center gap-3">
              <button
                onClick={moveLeft}
                className="p-3 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-emerald-800 hover:border-emerald-500 hover:shadow-md transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={moveRight}
                className="p-3 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-emerald-800 hover:border-emerald-500 hover:shadow-md transition-all active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {bestSellBooks && bestSellBooks.length > 0 ? (
              bestSellBooks.slice(0, 6).map((book: any) => (
                <Link
                  key={book.bookId}
                  href={`/books/details/${encodeURIComponent(book.bookName)}`}
                  className="group relative flex flex-col gap-3"
                >
                  <div
                    className="
                        relative aspect-[2/3] w-full overflow-hidden rounded-md 
                        bg-white shadow-sm border border-stone-200
                        group-hover:shadow-xl group-hover:shadow-stone-900/10
                        group-hover:-translate-y-1
                        transition-all duration-300
                      "
                  >
                    <img
                      src={book.bookImage}
                      alt={book.bookName}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300" />
                  </div>

                  <div className="space-y-1 px-1">
                    <h3
                      className="
                        font-serif font-semibold text-stone-900 text-sm leading-tight 
                        group-hover:text-emerald-800 transition-colors
                        line-clamp-2 min-h-[2.5em]
                      "
                    >
                      {book.bookName}
                    </h3>

                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-600 font-bold">
                      <Star size={10} fill="currentColor" />
                      <span>Top Rated</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full h-40 flex items-center justify-center text-stone-400 italic">
                Loading bestsellers...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
