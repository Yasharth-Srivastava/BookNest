"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setSearches([]);
      return;
    }

    setIsActive(true)

    const timer = setTimeout(async () => {
      try {
        const result = await axios.post("/api/search", { query });
        const allQueries = result.data.searchQueries;
        setSearches(allQueries);
      } catch (error) {}
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const closeDropdown = () =>{
    setIsActive(false)
    setSearches([])
    setQuery("")
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-xl relative">
        <input
          type="text"
          placeholder="Search Books..."
          className="
            w-full py-2 pl-10 pr-10
            bg-stone-100 border border-stone-200 
            text-stone-800 placeholder:text-stone-400 text-sm font-medium
            rounded-md
            focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            outline-none transition-all duration-200
            shadow-inner
          "
          onChange={(e) => setQuery(e.target.value)}
        />

        {(isActive && searches.length > 0) && (
          <div
            className="absolute z-50 mt-2 w-full 
            bg-white border border-stone-200 rounded-md 
            shadow-xl shadow-stone-900/10 
            overflow-hidden
            animate-in fade-in zoom-in-95 duration-100"
          >
            {searches.map((s: any) => (
              <div
                key={s.id}
                className="px-4 py-3 
                      flex items-center gap-3
                      border-b border-stone-50 last:border-0
                      hover:bg-emerald-50 hover:pl-5 
                      cursor-pointer transition-all duration-200 group/item"
              >
                <Link href={`/books/details/${encodeURIComponent(s.name)}`}  onClick={closeDropdown}  >
                  <h2 className="text-md font-medium">{s.name}</h2>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
