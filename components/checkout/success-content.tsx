'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useShop } from '@/contexts/shop-context'

export function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useShop()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      clearCart()
    } else {
      router.push('/')
    }
  }, [sessionId, clearCart, router])

  return (
    <>
      <h1 className="mt-4 text-3xl font-bold">Thank you for your order!</h1>
      <p className="mt-2 text-muted-foreground">
        We&apos;ll send you a confirmation email with your order details.
      </p>
    </>
  )
} 