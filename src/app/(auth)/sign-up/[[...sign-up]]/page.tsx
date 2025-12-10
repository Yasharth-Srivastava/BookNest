import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full bg-stone-50 flex items-center justify-center p-4 selection:bg-emerald-100 selection:text-emerald-900">
      
     
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl shadow-stone-900/10 overflow-hidden border border-stone-200 min-h-[600px]">
        
        <div className="relative flex flex-col items-center justify-center p-12 bg-emerald-900 text-stone-50 order-first lg:order-none">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 text-center space-y-4">
            <h1 className="font-serif font-bold text-5xl md:text-6xl tracking-tight leading-tight">
              Join <br />
              <span className="italic text-emerald-200">BookNest</span>
            </h1>
            <p className="text-emerald-100/80 text-lg font-light max-w-sm mx-auto mt-4">
              Create your account to start curating your personal library today.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 lg:p-12 bg-white">
          <SignUp
          />
        </div>
        
      </div>
    </div>
  );
}