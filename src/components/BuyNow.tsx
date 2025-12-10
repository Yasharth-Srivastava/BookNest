"use client";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";

const BuyNow = ({
  bookId,
  userId,
  availableStock,
}: {
  bookId: string;
  userId: string | undefined; 
  availableStock: number;
}) => {
  const router = useRouter();
  const isDisabled = availableStock === 0;
  const addToCart = useCartStore((state) => state.addToCart);

  const handleBuyNow = async () => {
    if (!userId) {
      return; 
    }
    await addToCart(bookId, userId);
    router.push("/cart");
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleBuyNow}
      className={`
        w-full flex items-center justify-center gap-2 
        px-8 py-4 rounded-md font-medium text-lg
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
        ${
          isDisabled
            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
            : "bg-emerald-800 text-emerald-50 hover:bg-emerald-900 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20 active:translate-y-0"
        }
      `}
    >
      <CreditCard size={20} className={isDisabled ? "opacity-50" : ""} />
      <span>{isDisabled ? "Out of Stock" : "Buy Now"}</span>
    </button>
  );
};

export default BuyNow;