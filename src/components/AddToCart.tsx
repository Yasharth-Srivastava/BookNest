"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs";
import { ShoppingBag, Check, XCircle } from "lucide-react";

const AddToCart = ({
  bookId,
  availableStock,
}: {
  bookId: string;
  availableStock: number;
}) => {
  const isDisabled = availableStock === 0;
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true); 

  const { user } = useUser();
  const userId: string | undefined = user?.id;

  const handleAdd = async () => {
    if (!userId) {
        setMessage("Please sign in to add items.");
        setIsSuccess(false);
        setShowFeedback(true);
        return;
    }

    
    const response = await addToCart(bookId, userId);
    

    setMessage(response.message);
    setIsSuccess(true); 
    setShowFeedback(true);
  };

  
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  return (
    <div className="relative w-full">
      <button
        disabled={isDisabled}
        onClick={isDisabled ? undefined : handleAdd}
        className={`
          relative w-full flex items-center justify-center gap-2 
          px-8 py-4 rounded-md font-medium text-lg
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
          ${
            isDisabled
              ? "bg-stone-200 text-stone-400 cursor-not-allowed"
              : "bg-stone-900 text-stone-50 hover:bg-stone-800 hover:-translate-y-0.5 shadow-lg shadow-stone-900/20 active:translate-y-0"
          }
        `}
      >
        <ShoppingBag size={20} className={isDisabled ? "opacity-50" : ""} />
        <span>{isDisabled ? "Out of Stock" : "Add to Cart"}</span>
      </button>

     
      <div 
        className={`
          absolute top-full left-0 right-0 mt-3 
          flex items-center justify-center gap-2 p-2 
          text-sm font-medium rounded-md shadow-sm border
          transition-all duration-300 transform origin-top
          ${showFeedback ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
          ${isSuccess ? "bg-emerald-50 text-emerald-800 border-emerald-100" : "bg-red-50 text-red-800 border-red-100"}
        `}
      >
        {isSuccess ? <Check size={16} /> : <XCircle size={16} />}
        {message}
      </div>
    </div>
  );
};

export default AddToCart;