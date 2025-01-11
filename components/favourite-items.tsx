'use client'

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useShop } from "@/contexts/shop-context"
import { useToast } from "@/hooks/use-toast"

export function FavoriteItems() {
  const { favorites, toggleFavorite, addToCart } = useShop()
  const { toast } = useToast()

  const handleRemoveFromFavorites = (productId: number, title: string) => {
    const product = favorites.find(p => p.id === productId)
    if (product) {
      toggleFavorite(product)
      toast({
        title: "Removed from favorites",
        description: `${title} has been removed from your favorites.`,
      })
    }
  }

  const handleAddToCart = (productId: number) => {
    const product = favorites.find(p => p.id === productId)
    if (product) {
      addToCart(product, 1)
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      })
    }
  }

  return (
    <div className="space-y-8">
      {favorites.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-lg">You haven&apos;t added any favorites yet.</p>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252]">
            <Link href="/shop">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg border">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="h-[300px] w-full object-cover transition-transform group-hover:scale-105"
                />
              </Link>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <div className="w-full space-y-2">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-white text-black hover:bg-gray-200"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/10 text-white hover:bg-white/20"
                      onClick={() => handleRemoveFromFavorites(product.id, product.title)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

