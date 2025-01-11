'use client'

import Image from "next/image"
import { useShop } from "@/contexts/shop-context"

export function OrderSummary() {
  const { cart, cartTotal } = useShop()

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      
      <div className="mt-6 space-y-4">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-lg">
              <Image
                src={item.product.thumbnail}
                alt={item.product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.product.title}</h3>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </p>
            </div>
            <p className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between">
          <p className="font-medium">Total</p>
          <p className="font-semibold">
            ${cartTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
} 