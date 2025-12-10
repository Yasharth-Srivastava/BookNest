import Image from "next/image";
import HeroImage from "./../assets/HeroImage.png";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-stone-50">
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div
          className="
            relative
            bg-[#EFECE5] /* A slightly darker cream to stand out from the bg */
            rounded-3xl 
            p-8 md:p-12 lg:p-20
            flex flex-col-reverse lg:flex-row items-center justify-between 
            gap-12 lg:gap-20
            overflow-hidden
          "
        >

          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-stone-300 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

          <div className="flex flex-col gap-8 lg:w-1/2 relative z-10 text-center lg:text-left">
            <h1
              className="
                text-5xl md:text-6xl lg:text-7xl 
                font-serif font-medium 
                text-stone-900 
                leading-[1.1]
              "
            >
              Explore the <br />
              <span className="italic text-emerald-800">Unknown.</span>
            </h1>

            <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover your next great read. Thousands of books, endless stories, 
              and infinite universes waiting to be opened.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={"/genres"}
                className=" 
                  px-8 py-4 
                  text-stone-50 font-semibold text-lg
                  bg-stone-900 
                  rounded-md /* Squared corners for the 'classic' look */
                  shadow-xl shadow-stone-900/20 
                  hover:bg-emerald-900 
                  hover:-translate-y-1 
                  transition-all duration-300
                "
              >
                Shop Collection
              </Link>
              
              <Link
                href={"/about"}
                className=" 
                  px-8 py-4 
                  text-stone-900 font-semibold text-lg
                  bg-transparent border border-stone-900
                  rounded-md
                  hover:bg-stone-200 
                  transition-all duration-300
                "
              >
                Our Story
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center relative z-10">
            <div
              className="
                relative 
                w-full max-w-md
                transition-transform duration-500
                hover:scale-[1.02]
              "
            >

              <div className="relative rounded-lg shadow-2xl shadow-stone-900/20 rotate-3 border-4 border-stone-50/50">
                <Image
                  src={HeroImage}
                  alt="Curated Book Collection"
                  className="w-full h-auto object-cover rounded-md"
                  priority
                />
              </div>

              <div 
                className="
                  absolute inset-0 bg-stone-300 rounded-lg -rotate-2 -z-10 
                  scale-[0.98] translate-y-2 translate-x-2
                "
              ></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}