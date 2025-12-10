"use client";
import RemoveFromCart from "@/components/RemoveFromCart";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Quantity from "@/components/Quantity";
import Script from "next/script";
import CheckoutButton from "@/components/CheckoutButton";

export default function CartPage() {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const cartData = useCartStore((state) => state.cartData);
  useEffect(() => {
    fetchCart();
  }, []);

  const totalAmount = cartData.reduce(
    (acc, item: any) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="flex items-center gap-3 mb-10 border-b border-stone-200 pb-6">
          <h1 className="text-4xl font-serif font-bold text-stone-900">
            Your Collection
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-6">
            {cartData.length === 0 ? (
              <div className="bg-stone-100 border-2 border-dashed border-stone-300 p-16 rounded-xl text-center">
                <p className="text-stone-500 text-xl font-serif italic">
                  Your shelf is currently empty.
                </p>
              </div>
            ) : (
              cartData.map((item: any) => (
                <div
                  key={item.id}
                  className="
                    bg-white p-6 rounded-lg 
                    shadow-sm shadow-stone-900/5 
                    border border-stone-200 
                    flex gap-6 items-start 
                    transition-all duration-300 hover:shadow-md hover:border-emerald-100
                  "
                >
                  
                  <div className="relative h-40 w-28 flex-shrink-0 shadow-md rounded-sm overflow-hidden">
                    <img
                      src={item.bookImage}
                      alt={item.bookName}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-40">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-serif font-bold text-stone-900 line-clamp-2 leading-tight">
                          {item.bookName}
                        </h3>
                        <p className="text-xl font-serif font-semibold text-emerald-800 whitespace-nowrap">
                          &#8377;{item.price}
                        </p>
                      </div>
                      
                      <p className="text-sm font-medium text-stone-500 mt-2 mb-3">
                        By {item.bookAuthor || "Unknown Author"}
                      </p>

                      <div className="inline-block px-2 py-1 bg-stone-100 text-xs font-semibold text-stone-600 rounded">
                         Stock: {item.stock}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <Quantity
                        itemQuantity={item.quantity}
                        cartId={item.id}
                        stockAvailable={item.stock}
                      />
                      <RemoveFromCart cartId={item.id} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        
          {cartData.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-stone-100 p-8 rounded-xl border border-stone-200 sticky top-32 shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6 border-b border-stone-200 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm text-stone-600 font-medium">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-stone-900">&#8377;{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-stone-900">&#8377;5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Estimate</span>
                    <span className="text-stone-900">&#8377;0.00</span>
                  </div>
                </div>

                <div className="border-t border-stone-300 my-6 pt-6 flex justify-between items-center">
                  <span className="text-lg font-bold text-stone-900">
                    Total
                  </span>
                  <span className="text-3xl font-serif font-bold text-stone-900">
                    &#8377;{(totalAmount + 5).toFixed(2)}
                  </span>
                </div>

                <div>
                  <Script
                    src="https://checkout.razorpay.com/v1/checkout.js"
                    strategy="afterInteractive"
                  />
                  <div className="w-full">
                    <CheckoutButton />
                  </div>
                </div>

                <div className="mt-6 flex justify-center items-center gap-2 text-stone-400">
                  <span className="text-xs uppercase tracking-widest">
                    Secured by Razorpay
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}