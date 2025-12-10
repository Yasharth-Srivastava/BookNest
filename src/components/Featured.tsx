import Image from "next/image"
import ScienceFiction from "./../assets/ScienceFiction.png"
import Fantasy from "./../assets/Fantasy.png"
import Thriller from "./../assets/Thriller.png"
import Link from "next/link"
import { ArrowRight } from "lucide-react";

export default function Featured() {
  const genres = [
    {
      name: "science fiction",
      img: ScienceFiction,
    },
    {
      name: "fantasy",
      img: Fantasy,
    },
    {
      name: "thriller",
      img: Thriller,
    }
  ]

  return (
    <section className="w-full bg-stone-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
            Curated Collections
          </h2>
          <p className="mt-3 text-stone-500 max-w-2xl mx-auto">
            Explore our most popular categories and find your next obsession.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {genres.map((genre) => (
            <Link 
              key={genre.name} 
              href={`/genres/${genre.name}`}
              className="group relative block h-[400px] w-full overflow-hidden rounded-xl"
            >

              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={genre.img}
                  alt={genre.name}
                  className="
                    w-full h-full object-cover 
                    transition-transform duration-700 ease-out 
                    group-hover:scale-110
                  "
                />
              </div>

              
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                
                <h3 className="text-3xl font-serif font-bold text-stone-50 mb-4 uppercase">
                  {genre.name}
                </h3>

                <span className="
                    inline-flex items-center gap-2 
                    text-sm font-semibold text-emerald-300 
                    group-hover:gap-3 transition-all duration-300
                  "
                >
                  Explore Category <ArrowRight size={16} />
                </span>
              </div>
              
              
              <div className="absolute inset-0 border-2 border-stone-50/0 group-hover:border-stone-50/20 rounded-xl transition-colors duration-300"></div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
