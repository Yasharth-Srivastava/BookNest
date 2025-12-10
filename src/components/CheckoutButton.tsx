"use client";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { Lock } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutButton = () => {
  const router = useRouter();
  const fetchCart = useCartStore((state) => state.fetchCart);

  const handleCheckout = async () => {
    try {
      const res = await axios.post("/api/razorpay/orders");

      const data = await res.data;
      console.log(data);

      const { id, currency, amount } = data;

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "BookNest",
        description: "Order Payment",
        order_id: id,
        handler: async function (response: any) {
          const verifyRes = await axios.post("/api/razorpay/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.message === "success") {
            fetchCart();
            router.push("/");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {}
  };

  return (
    <button
      className="
        w-full flex items-center justify-center gap-2
        bg-emerald-800 text-emerald-50 
        py-4 rounded-md font-bold text-lg tracking-wide
        shadow-xl shadow-emerald-900/20
        hover:bg-emerald-900 hover:-translate-y-0.5 
        active:translate-y-0 active:scale-[0.99]
        transition-all duration-300 ease-out
      "
      onClick={handleCheckout}
    >
      <Lock size={18} className="opacity-80" />
      Secure Checkout
    </button>
  );
};

export default CheckoutButton;