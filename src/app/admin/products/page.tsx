"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const result = await axios.get("/api/books");
      console.log(result.data.allProducts);
      setProducts(result.data.allProducts);
    }
    fetchProducts();
  }, []);

  const fetchItem = async (id: string) => {
    router.push(`/admin/update/${id}`);
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-12 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-stone-900">
              Inventory Management
            </h1>
            <p className="text-stone-500 mt-2">
              View and manage your entire book collection.
            </p>
          </div>

          <div className="px-4 py-2 bg-white rounded-full border border-stone-200 text-sm font-semibold text-stone-600 shadow-sm">
            Total Items: {products.length}
          </div>
        </div>

     
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-400 uppercase tracking-wider">
            <div className="col-span-6">Book Details</div>
            <div className="col-span-2 text-center">Author</div>
            <div className="col-span-2 text-center">Stock Level</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-stone-100">
            {products.length > 0 ? (
              products.map((book: any) => (
                <div
                  key={book.bookId}
                  className="
                  group 
                  grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center 
                  p-6 md:py-4 md:px-6 
                  hover:bg-stone-50/50 transition-colors duration-200
                "
                >
                  
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <div className="relative w-12 h-16 md:w-10 md:h-14 flex-shrink-0 bg-stone-200 rounded shadow-sm overflow-hidden">
                      <img
                        src={book.bookImage}
                        alt={book.bookName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-stone-900 text-lg md:text-base line-clamp-1 group-hover:text-emerald-800 transition-colors">
                        {book.bookName}
                      </h3>
                      
                      <p className="md:hidden text-sm text-stone-500">
                        {book.bookAuthor}
                      </p>
                    </div>
                  </div>

                  
                  <div className="hidden md:block col-span-2 text-center text-sm text-stone-600 font-medium truncate px-2">
                    {book.bookAuthor}
                  </div>

                  
                  <div className="col-span-1 md:col-span-2 flex md:justify-center">
                    <div
                      className={`
                    inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider
                    ${
                      book.stock > 10
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : book.stock > 0
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-red-50 text-red-700 border-red-100"
                    }
                  `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          book.stock > 10
                            ? "bg-emerald-500"
                            : book.stock > 0
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {book.stock} in Stock
                    </div>
                  </div>

                  
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <button
                      onClick={() => fetchItem(book.bookId)}
                      className="
                      px-4 py-2 
                      text-sm font-medium text-stone-600 
                      bg-white border border-stone-200 rounded-md shadow-sm
                      hover:text-emerald-800 hover:border-emerald-200 hover:bg-emerald-50
                      active:scale-95 transition-all duration-200
                    "
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-stone-400 font-serif italic text-lg">
                  No products found in inventory.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
