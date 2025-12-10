"use client"
import { useCartStore } from '@/store/cartStore'

const RemoveFromCart = ({cartId}:{cartId:number}) => {

    const deleteFromCart = useCartStore(state=>state.deleteFromCart)
    const fetchCart = useCartStore(state=>state.fetchCart)

    const handleDelete = ()=>{
      deleteFromCart(cartId)
      fetchCart()
    }
  return (
    <button className="text-l font-medium text-red-500 hover:text-red-700 transition" onClick={handleDelete}>
        Remove
    </button>
  )
}

export default RemoveFromCart