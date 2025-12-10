"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import Search from "./Search";

interface UserType {
  isAdmin: boolean;
}

const Navbar = ({ isAdmin }: UserType) => {
  const [showBar, setShowBar] = useState<boolean>(false);
  const {user, isSignedIn} = useUser()

  return (
    <nav
      className="
        fixed top-0 left-0 z-50 w-full 
        bg-stone-50/90 backdrop-blur-md 
        border-b border-stone-200
        text-stone-800
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                BookNest
                <span className="text-emerald-700">.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["About", "Genres", "Orders"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 hover:underline decoration-emerald-600/50 underline-offset-4 transition-all"
              >
                {item}
              </Link>
            ))}
            
            <Link
              href="/cart"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 hover:underline decoration-emerald-600/50 underline-offset-4 transition-all"
            >
              Cart
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
          {
            isSignedIn &&
              (
                <div className="w-64 hidden lg:block">
                  <Search />
                </div>
              )
          }
            

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="
                  text-xs font-bold uppercase tracking-wider 
                  text-emerald-800 bg-emerald-100/50 
                  px-3 py-1 rounded-sm border border-emerald-200
                  hover:bg-emerald-200 transition-colors
                "
              >
                Admin
              </Link>
            )}

            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton>
                  <button className="text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="bg-stone-900 hover:bg-stone-800 text-stone-50 px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border border-stone-200"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowBar(!showBar)}
              className="text-stone-600 hover:text-stone-900 p-2 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {showBar ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {showBar && (
        <div className="md:hidden bg-stone-50 border-t border-stone-200 shadow-lg absolute w-full left-0 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-4 pb-6 space-y-4">
            
            <div className="mb-6">
              <Search />
            </div>

            <div className="flex flex-col gap-4">
              {["About", "Genres", "Cart", "Orders"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setShowBar(false)}
                  className="block text-lg font-serif text-stone-700 hover:text-stone-900 hover:pl-2 transition-all"
                >
                  {item}
                </Link>
              ))}
              
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setShowBar(false)}
                  className="block text-lg font-serif text-emerald-800 font-semibold"
                >
                  Admin Panel
                </Link>
              )}
            </div>

            <div className="border-t border-stone-200 pt-6 mt-4 flex items-center justify-between">
               <div className="flex gap-4">
                <SignedOut>
                    <SignInButton>
                        <button className="text-stone-600 font-semibold">Log In</button>
                    </SignInButton>
                    <SignUpButton>
                        <button className="bg-stone-900 text-stone-50 px-4 py-2 rounded-md text-sm">Join</button>
                    </SignUpButton>
                </SignedOut>
               </div>
               <SignedIn>
                  <UserButton />
               </SignedIn>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;