"use client";
import { createBook } from "@/lib/actions/book-action";
import { useActionState, useEffect, useState } from "react";


export default function AddBooksPage() {
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(createBook, null);

  useEffect(() => {
    if (state?.message === "Invalid Data. All fields are required") {
      setError(state?.message);
      setMessage(null);
      return;
    } else {
      setMessage(state?.message);
      setError(null)
    }

    const timer = setTimeout(() => {
      setMessage(null);
      setError(null)
    }, 5000);

    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="w-full min-h-screen bg-stone-50 flex justify-center px-4 py-12 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="w-full max-w-3xl bg-white border border-stone-200 rounded-xl shadow-2xl shadow-stone-900/5 p-8 md:p-12 h-fit">
        
        <div className="text-center mb-10 border-b border-stone-100 pb-6">
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 mb-2">
            Catalog Entry
          </h1>
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">
            Add New Title to Inventory
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Book Title</label>
                <input
                  type="text"
                  name="bookname"
                  placeholder="e.g. The Great Gatsby"
                  className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                            transition-all duration-200 shadow-inner"
                />
            </div>

            <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Author</label>
                <input
                  type="text"
                  name="authorname"
                  placeholder="e.g. F. Scott Fitzgerald"
                  className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                            transition-all duration-200 shadow-inner"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Synopsis</label>
            <textarea
              name="bookdescription"
              placeholder="Enter a detailed description of the book..."
              className="w-full h-40 resize-none p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                        transition-all duration-200 shadow-inner leading-relaxed"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Price (₹)</label>
                <input
                  type="text"
                  name="bookprice"
                  placeholder="0.00"
                  className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                            transition-all duration-200 shadow-inner font-mono"
                />
            </div>

            <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Stock Quantity</label>
                <input
                  type="text"
                  name="stock"
                  placeholder="0"
                  className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 
                            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                            transition-all duration-200 shadow-inner font-mono"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Cover Image URL</label>
            <input
              type="text"
              name="bookurl"
              placeholder="https://..."
              className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                        transition-all duration-200 shadow-inner font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Genre Category</label>
            <input
              type="text"
              name="genre"
              placeholder="e.g. Fiction, History, Sci-Fi"
              className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                        transition-all duration-200 shadow-inner"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="
                w-full py-4 rounded-lg 
                bg-emerald-800 hover:bg-emerald-900 
                text-emerald-50 font-bold tracking-wide text-lg
                shadow-lg shadow-emerald-900/20 
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
                transition-all duration-300 ease-out
              "
            >
              Publish to Store
            </button>
          </div>

          <div className="w-full flex justify-center">
            {error ? (
              <div className="w-full px-4 py-3 rounded-md bg-red-50 border border-red-200 text-red-700 font-medium text-center text-sm">
                {error}
              </div>
            ) : isPending ? (
              <div className="w-full px-4 py-3 rounded-md bg-stone-100 border border-stone-200 text-stone-600 font-medium text-center text-sm animate-pulse flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                Processing Entry...
              </div>
            ) : message ? (
              <div className="w-full px-4 py-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-center text-sm">
                {message}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
