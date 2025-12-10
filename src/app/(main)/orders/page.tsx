"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      try {
        const orderHistory = await axios.get("/api/orders");
        const history = orderHistory.data.orderHistory;
        setOrders(history);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    }
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10 border-b border-stone-200 pb-6 flex items-center gap-3">

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
            Order History
          </h1>
        </div>

        <div className="space-y-8">
          {orders.length === 0 ? (
             <div className="text-center py-20 bg-stone-100 rounded-xl border border-stone-200 border-dashed">
                <p className="text-stone-500 font-serif italic text-lg">You haven't placed any orders yet.</p>
             </div>
          ) : (
            orders.map((order: any) => (
              <div
                key={order.id}
                className="
                  bg-white 
                  rounded-xl 
                  border border-stone-200
                  shadow-sm shadow-stone-900/5
                  overflow-hidden
                  transition-all duration-300 hover:shadow-md hover:border-emerald-200
                "
              >
                
                <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                      Order ID
                    </span>
                    <h2 className="text-sm font-mono text-stone-700 font-medium">
                      {order.id}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                       <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                          Total Amount
                       </span>
                       <span className="text-lg font-serif font-bold text-stone-900">
                         ₹{order.amount/100}
                       </span>
                    </div>

                    <span
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border
                        ${
                          order.status === "PAID"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }
                      `}
                    >
                      {order.status === "PAID" ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {order.status}
                    </span>
                  </div>
                </div>

              
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 rounded-lg border border-stone-100 hover:bg-stone-50 transition-colors"
                      >

                        <div className="relative w-16 h-24 flex-shrink-0 shadow-sm rounded-sm overflow-hidden bg-stone-200">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col justify-center">
                          <h3 className="text-sm font-bold text-stone-900 line-clamp-2 leading-tight font-serif mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-stone-500 font-medium">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}