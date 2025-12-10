'use client';
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePage(){

    const router = useRouter()
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        bookName:"",
        bookAuthor:"",
        bookDescription:"",
        bookImage:"",
        stock:""
    })
    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        async function getProduct(){
            const result =  await axios.post('/api/books/product', {id})
            const data = result.data.product[0]
            setFormData({
                bookName: data.bookName,
                bookAuthor: data.bookAuthor,
                bookDescription: data.bookDescription,
                bookImage:data.bookImage,
                stock: data.stock,
            })
        }
        if(id){
            getProduct()
        }
    },[id])

    const handleUpdateSubmission = async(e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')
        try {
            const result = await axios.patch('/api/books/update', {id, formData})
            setMessage(result.data.message)     
            setTimeout(() => {
                router.replace("/admin/products"); 
            }, 1000);
        } catch (error) {
            setMessage('Something Went Wrong')
        }
    }

    return (
  <div className="w-full min-h-screen bg-stone-50 flex justify-center px-4 py-12 selection:bg-emerald-100 selection:text-emerald-900">
    <div className="w-full max-w-2xl bg-white border border-stone-200 rounded-xl shadow-2xl shadow-stone-900/5 p-8 md:p-12 h-fit">
      

      <div className="mb-8 border-b border-stone-100 pb-6">
        <h1 className="font-serif font-bold text-2xl md:text-3xl text-stone-900 mb-2">
          Edit Product Details
        </h1>
        <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">
          Update Inventory Information
        </p>
      </div>

      <form onSubmit={handleUpdateSubmission} className="space-y-6">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">
              Book Title
            </label>
            <input
              type="text"
              value={formData.bookName}
              onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
              className="w-full p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                        transition-all duration-200 shadow-inner font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">
              Author
            </label>
            <input
              type="text"
              value={formData.bookAuthor}
              onChange={(e) => setFormData({ ...formData, bookAuthor: e.target.value })}
              className="w-full p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                        transition-all duration-200 shadow-inner"
            />
          </div>
        </div>

     
        <div className="space-y-2">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">
            Synopsis / Description
          </label>
          <textarea
            value={formData.bookDescription}
            onChange={(e) => setFormData({ ...formData, bookDescription: e.target.value })}
            className="w-full h-32 resize-y p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                      transition-all duration-200 shadow-inner leading-relaxed"
          />
        </div>

       
        <div className="space-y-2 max-w-xs">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">
            Current Stock Level
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full p-3 pl-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                        transition-all duration-200 shadow-inner font-mono"
            />
            <div className="absolute right-3 top-3 text-xs font-bold text-stone-400 pointer-events-none">
              UNITS
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex flex-col gap-4">
          <button
            type="submit"
            className="
              w-full py-3 rounded-lg 
              bg-emerald-800 hover:bg-emerald-900 
              text-emerald-50 font-bold tracking-wide text-lg
              shadow-lg shadow-emerald-900/20 
              hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
              transition-all duration-300 ease-out
            "
          >
            Save Changes
          </button>

          
          {message && (
            <div className="
              w-full px-4 py-3 rounded-md 
              bg-emerald-50 border border-emerald-200 
              text-emerald-800 font-medium text-center text-sm
              animate-in fade-in slide-in-from-top-2 duration-300
            ">
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  </div>
);
}