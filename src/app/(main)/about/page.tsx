import Link from "next/link";
import { BookOpen, Heart, Coffee, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-stone-50 text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      
    
      <section className="pt-32 pb-20 px-6 text-center border-b border-stone-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-800 font-medium tracking-widest uppercase text-sm mb-4">
            Est. 2025
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-stone-900 leading-tight">
            Welcome to <span className="italic text-emerald-800">BookNest</span>.
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light">
            We are not just a bookstore. We are a sanctuary for stories, 
            a haven for dreamers, and a home for the written word.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Curating the world's imagination.
            </h2>
            <div className="space-y-4 text-lg text-stone-600 leading-relaxed">
              <p>
                In an age of endless digital noise, we believe in the quiet power of a page turn. 
                BookNest was built with a singular mission: to connect readers with stories that matter.
              </p>
              <p>
                Whether you are looking for a rare classic, a gripping thriller, or a guide to a new skill, 
                our shelves are stocked with care. We don't just sell books; we champion the ideas inside them.
              </p>
            </div>
            
            <div className="pt-4">
                <p className="font-serif italic text-stone-400 text-2xl">
                    "A room without books is like a body without a soul."
                </p>
            </div>
          </div>

          
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5]">
              
              <div className="absolute inset-0 bg-stone-200 rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 bg-stone-900/5 rounded-lg transform -rotate-2"></div>
              
              <div className="relative h-full w-full bg-stone-300 rounded-lg overflow-hidden shadow-2xl shadow-stone-900/20 border-4 border-white flex items-center justify-center">
                
                 <div className="text-center p-8">
                    <BookOpen size={64} className="mx-auto text-stone-400 mb-4" />
                    <p className="text-stone-500 font-medium">Inside our Library</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-24 px-6 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
               What We Stand For
            </h2>
            <div className="h-1 w-20 bg-emerald-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { icon: <BookOpen size={32} />, title: "Curated Excellence", desc: "We don't sell everything. We sell the best. Every title is hand-picked." },
              { icon: <Heart size={32} />, title: "For the Love of Reading", desc: "Built by bibliophiles, for bibliophiles. We treat every book with respect." },
              { icon: <Coffee size={32} />, title: "A Quiet Escape", desc: "We believe buying a book should be as relaxing as reading one." }
            ].map((item, i) => (
              <div
                key={i}
                className="
                    group p-8 rounded-xl bg-white border border-stone-200
                    hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 
                    transition-all duration-300
                "
              >
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-emerald-800 mb-6 group-hover:bg-emerald-50 transition-colors">
                    {item.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Star size={40} className="mx-auto text-emerald-800 mb-6" fill="currentColor" opacity={0.2} />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-8">
            Your next chapter is waiting.
          </h2>
          <Link
            href="/genres"
            className="
                inline-block 
                bg-stone-900 text-stone-50 
                font-medium text-lg px-10 py-4 
                rounded-md shadow-lg shadow-stone-900/20
                hover:bg-emerald-900 hover:-translate-y-1 
                transition-all duration-300
            "
          >
            Explore the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}