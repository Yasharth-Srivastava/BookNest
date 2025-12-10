"use client";
import React, { useState } from "react";
import { Star, Quote, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

const allReviews = [
  {
    id: 1,
    name: "Elena Richardson",
    role: "Fiction Enthusiast",
    rating: 5,
    text: "Finally, a bookstore that feels like a sanctuary. The curation is impeccable—I found titles here that I couldn't find anywhere else. The packaging was eco-friendly and beautiful.",
    initials: "ER",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "History Student",
    rating: 5,
    text: "BookNest is a gem. The search function is incredibly fast, and the detailed descriptions helped me pick the exact reference books I needed for my thesis. Delivery was prompt too.",
    initials: "MC",
    color: "bg-stone-200 text-stone-700",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    rating: 4,
    text: "I love the aesthetic of this site. It doesn't feel like a cluttered shop; it feels like browsing a friend's library. My order arrived in perfect condition.",
    initials: "SJ",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: 4,
    name: "Dr. Aris Thorne",
    role: "Collector",
    rating: 5,
    text: "As a collector of rare editions, I am usually skeptical of online descriptions. But BookNest was spot on. The book arrived exactly as described. Highly recommended.",
    initials: "AT",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: 5,
    name: "Liam O'Connor",
    role: "Sci-Fi Fan",
    rating: 5,
    text: "The sci-fi collection here is underrated. Found some classic Asimov prints I've been hunting for years. The checkout process was smooth and secure.",
    initials: "LO",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    id: 6,
    name: "Priya Patel",
    role: "Book Club Host",
    rating: 5,
    text: "Ordered 10 copies for my book club. Customer support was lovely and helped me track the bulk order. We will definitely be ordering our next month's pick from here.",
    initials: "PP",
    color: "bg-stone-200 text-stone-700",
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Verified Buyer",
    rating: 4,
    text: "Great experience. The only reason I'm giving 4 stars is I wish they had more vintage magazines. But for novels? 10/10.",
    initials: "JW",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: 8,
    name: "Sofia G.",
    role: "Casual Reader",
    rating: 5,
    text: "Simply delightful. Browsing genres feels like an adventure. I ended up buying three books when I only came for one. Oops!",
    initials: "SG",
    color: "bg-indigo-100 text-indigo-800",
  },
];



const Reviews = () => {

  const [reviews, setReviews] = useState(allReviews)

  const moveRight = () => {
    setReviews((prev) => {
      if (prev.length === 0) return prev;
      const rearranged = [...prev];
      const first = rearranged.shift();
      if (first) rearranged.push(first);
      return rearranged;
    });
  };

  const moveLeft = () => {
    setReviews((prev)=>{
      if (prev.length === 0) return prev
      const rearranged = [...prev];
      const last = rearranged.pop();
      if (last) rearranged.unshift(last);
      return rearranged;
    })
  }

  return (
    <section className="w-full bg-stone-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
            Notes from the Community
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light">
            Don't just take our word for it. Here is what fellow readers are saying about their BookNest experience.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-2">
                    <button
                      onClick={moveLeft}
                      className="
                        p-3 rounded-full border border-stone-300 
                        text-stone-600 hover:text-stone-900
                        hover:bg-stone-200 hover:border-stone-400
                        transition-all duration-300 
                        focus:outline-none active:scale-95
                      "
                      aria-label="Previous items"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={moveRight}
                      className="
                        p-3 rounded-full border border-stone-300 
                        text-stone-600 hover:text-stone-900
                        hover:bg-stone-200 hover:border-stone-400
                        transition-all duration-300 
                        focus:outline-none active:scale-95
                      "
                       aria-label="Next items"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0,4).map((review) => (
            <div
              key={review.id}
              className="
                flex flex-col justify-between
                bg-white p-6 rounded-xl 
                border border-stone-200
                shadow-sm shadow-stone-900/5
                hover:shadow-xl hover:shadow-stone-900/10 hover:-translate-y-1 hover:border-emerald-100
                transition-all duration-300 ease-out
              "
            >
              <div>

                <div className="relative mb-6">
                  <Quote size={24} className="text-stone-200 absolute -top-2 -left-2 -z-10 opacity-50" />
                  <p className="text-stone-600 font-serif italic leading-relaxed text-sm relative z-10">
                    "{review.text}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 mt-auto">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center 
                    text-xs font-bold shadow-inner ${review.color}
                  `}
                >
                  {review.initials}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-stone-400 font-medium">
                    {review.role}
                    <CheckCircle2 size={10} className="text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;