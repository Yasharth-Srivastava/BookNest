"use client"
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminDashBoardPage() {
  const {user, isLoaded, isSignedIn} = useUser()

  const isAdmin = user?.publicMetadata.role === "admin"

 
  if (!isAdmin) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-stone-50 px-6 selection:bg-red-100 selection:text-red-900">
        <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-xl shadow-2xl shadow-stone-900/10 flex flex-col items-center text-center">
          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">
            Admin Not Authorized
          </h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            You do not have permission to access this page.
          </p>
          <Link
            href="/"
            className="px-8 py-3 
              bg-stone-900 hover:bg-stone-800 
              text-stone-50 font-medium 
              rounded-md transition-all duration-300
              shadow-lg shadow-stone-900/20"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-stone-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-emerald-100 selection:text-emerald-900">
      
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <p className="text-emerald-800 font-bold tracking-widest uppercase text-xs mb-3">
          Command Center
        </p>
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-stone-900 mb-4">
          Admin Dashboard
        </h1>
        <div className="h-1 w-24 bg-stone-200 mx-auto rounded-full"></div>
      </div>

      
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <Link 
          href="/admin/books" 
          className="
            group
            p-8 
            bg-white 
            border border-stone-200 
            rounded-xl 
            shadow-sm hover:shadow-xl hover:shadow-stone-900/5
            hover:border-emerald-200 hover:-translate-y-1 
            transition-all duration-300
            flex flex-col items-center justify-center gap-4
            text-center
          "
        >
          <span className="text-xl font-serif font-bold text-stone-700 group-hover:text-stone-900">
            Add New Book
          </span>
          <span className="text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest">
            Create Listing
          </span>
        </Link>

        <Link 
          href="/admin/products" 
          className="
            group
            p-8 
            bg-white 
            border border-stone-200 
            rounded-xl 
            shadow-sm hover:shadow-xl hover:shadow-stone-900/5
            hover:border-emerald-200 hover:-translate-y-1 
            transition-all duration-300
            flex flex-col items-center justify-center gap-4
            text-center
          "
        >
      
          <span className="text-xl font-serif font-bold text-stone-700 group-hover:text-stone-900">
            Manage Inventory
          </span>
          <span className="text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest">
            View All Products
          </span>
        </Link>

  
        <div className="
            p-8 
            bg-stone-100 
            border border-stone-200 border-dashed
            rounded-xl 
            flex flex-col items-center justify-center gap-4
            text-center
            opacity-70
          "
        >
          <p className="text-lg font-medium text-stone-500 font-serif italic">
            More features coming soon...
          </p>
        </div>

      </div>
    </div>
  );
}
