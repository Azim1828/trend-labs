import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFE4E0]">
      <div className="container flex flex-col items-center justify-center px-5 text-center">
        <ShoppingBag className="h-24 w-24 text-[#FF6B6B] mb-8" />
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Oops! The page you&apos;re looking for seems to have gone on a shopping spree.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252]">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/shop">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

