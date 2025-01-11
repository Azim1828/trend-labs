'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { useShop } from "@/contexts/shop-context"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { user } = useAuth()
  const { cart } = useShop()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </main>
  )
} 