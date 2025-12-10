import axios from "axios"
import {create} from "zustand"
import { persist } from "zustand/middleware"

interface CartData{
    id: number,
    userId: string | undefined,
    bookId: string | undefined,
    quantity: number | undefined,
    bookName: string | undefined,
    bookImage: string | undefined,
    price: number | undefined,
    bookAuthor: string | undefined,
}

interface CartState{
    cartData: CartData[],
    addToCart:(bookId: string, userId: string | undefined)=>Promise<{message: string}>;
    deleteFromCart:(cartId:number)=>void;
    fetchCart:()=>void
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartData:[],
            addToCart:async(bookId, userId)=>{
                if(!userId){
                    return ({message: "NO_USER"})
                }
            
                const result = await axios.get('/api/cart')
                const existingCartItems = await result.data.data
                console.log(existingCartItems)
                for(const item of existingCartItems){
                    if(item.bookId === bookId){
                        console.log("Item Already Exist in Cart")
                        return ({message:"Cart Already Exist"})
                    }
                }
                
                const response = await axios.post(`/api/cart/add`,{data:{userId, bookId, quantity: 1}})

                return({
                    message: "Added",
                    data :response.data
                })
               
            },
            deleteFromCart:async(cartId)=>{
                const result = await axios.post(`/api/cart/remove`, { cartId })
            },
            fetchCart:async()=>{
                const result = await axios.get('/api/cart')
                const response  = await result.data.data
                set({cartData: response})
            }
        }),
        {name : 'cart-storage'}
    ),
)