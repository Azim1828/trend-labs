'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useShop } from "@/contexts/shop-context"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { cart, cartTotal } = useShop()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  })

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsLoading(true)

      // Create Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customer: data,
        }),
      })

      const { url } = await response.json()

      if (url) {
        router.push(url)
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            {...register("name")}
            placeholder="Full Name"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("address")}
            placeholder="Address"
            disabled={isLoading}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Input
              {...register("city")}
              placeholder="City"
              disabled={isLoading}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("state")}
              placeholder="State"
              disabled={isLoading}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("zip")}
              placeholder="ZIP"
              disabled={isLoading}
            />
            {errors.zip && (
              <p className="mt-1 text-sm text-red-500">{errors.zip.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay ${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(cartTotal)}`
        )}
      </Button>
    </form>
  )
} 