import { currentUser } from "@clerk/nextjs/server";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import Featured from "@/components/Featured";
import Bestseller from "@/components/Bestseller";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default async function Home() {
  const user = await currentUser();

  return (
    <main
      className="
        min-h-screen 
        w-full 
        bg-stone-50 
        text-stone-900
        /* This changes the highlight color when user selects text */
        selection:bg-emerald-100 selection:text-emerald-900
      "
    >
     
      <Hero />

      <NewArrivals />

      <Bestseller />

      <Featured />

      <Reviews />

      <Footer />

    </main>
  );
}