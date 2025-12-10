import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-900 text-stone-400 font-sans pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
  
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-stone-50 tracking-tight">
                BookNest<span className="text-emerald-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              A curated sanctuary for stories. We believe in the power of the written word to inspire, educate, and transform.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          <div>
            <h3 className="text-stone-50 font-serif font-bold mb-6">Explore</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/genres">All Genres</FooterLink>
              <FooterLink href="#">New Arrivals</FooterLink>
              <FooterLink href="#">Bestsellers</FooterLink>
              <FooterLink href="/about">Our Story</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-stone-50 font-serif font-bold mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/orders">Track Order</FooterLink>
              <FooterLink href="/cart">Shopping Cart</FooterLink>
              <FooterLink href="#">Returns Policy</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </ul>
          </div>

         
          <div>
            <h3 className="text-stone-50 font-serif font-bold mb-6">Stay in the Loop</h3>
            <p className="text-sm text-stone-400 mb-4">
              Join our literary circle for exclusive updates and rare finds.
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="
                  w-full px-4 py-2.5 rounded-md 
                  bg-stone-800 border border-stone-700 
                  text-stone-200 placeholder:text-stone-500 text-sm
                  focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600
                  transition-all duration-300
                "
              />
              <button 
                type="button"
                className="
                  w-full px-4 py-2.5 rounded-md 
                  bg-emerald-800 text-emerald-50 text-sm font-semibold
                  hover:bg-emerald-700 hover:-translate-y-0.5
                  transition-all duration-300
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="h-px w-full bg-stone-800 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {currentYear} BookNest. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-stone-300 transition-colors">Cookie Settings</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

// --- Helper Components for cleaner code ---

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <Link 
    href={href} 
    className="
      w-8 h-8 flex items-center justify-center rounded-full 
      bg-stone-800 text-stone-400 
      hover:bg-emerald-800 hover:text-white hover:-translate-y-1 
      transition-all duration-300
    "
  >
    {icon}
  </Link>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link 
      href={href} 
      className="hover:text-emerald-400 hover:translate-x-1 inline-block transition-all duration-200"
    >
      {children}
    </Link>
  </li>
);