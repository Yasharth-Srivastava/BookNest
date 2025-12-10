"use client";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";

const Quantity = ({
  itemQuantity,
  cartId,
  stockAvailable
}: {
  itemQuantity: number;
  cartId: string;
  stockAvailable: number;
}) => {
  const [quantity, setQuantity] = useState<number>(itemQuantity);
  const isFirstRender = useRef(true);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      await axios.post(`/api/cart/update`, {
        data: { quantity, cartId },
      });
      fetchCart();
    }, 500);
    return () => clearTimeout(timer);
  }, [quantity]);

  const handleQuantityIncrementChange = async () => {
    if(quantity< stockAvailable){
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
    }
    
  };

  const handleQuantityDecrementChange = async () => {
    const newQuantity = quantity - 1;

    setQuantity(newQuantity);
  };

  return (
    <div>
      <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1">
        {quantity > 1 && (
          <button onClick={handleQuantityDecrementChange}>
            <Minus size={18} />
          </button>
        )}
        <span className="text-sm font-semibold text-slate-900">{quantity}</span>

        {quantity < 10 && (
          <button
            disabled={quantity >= stockAvailable || quantity == 10}
           onClick={handleQuantityIncrementChange}>
            <Plus size={18} />
          </button>
        )}
      </div>
      {quantity === 10 && (
      <p className="text-s text-red-500 mt-1 font-bold ">
        Maximum quantity reached (10 allowed)
      </p>
    )}
    </div>
  );
};

export default Quantity;
