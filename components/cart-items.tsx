'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useShop } from "@/contexts/shop-context"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export function CartItems() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useShop()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateCartQuantity(productId, quantity)
  }

  const handleRemoveItem = (productId: number, title: string) => {
    removeFromCart(productId)
    toast({
      title: "Item removed",
      description: `${title} has been removed from your cart.`,
    })
  }

  const handleCheckout = () => {
    if (!user) {
      // If user is not logged in, redirect to login with return URL
      router.push('/login?redirect=/checkout')
      return
    }
    // If user is logged in, proceed to checkout
    router.push('/checkout')
  }

  return (
    <div className="space-y-8">
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-lg">Your cart is empty.</p>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252]">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value))}
                    className="w-16"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(product.id, product.title)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-2xl font-bold">${cartTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-end">
            <Button 
              className="bg-[#FF6B6B] hover:bg-[#FF5252]"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

