'use client'

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/shop"
import { useShop } from "@/contexts/shop-context"
import { useToast } from "@/hooks/use-toast"

type ProductCardProps = Product

export function ProductCard({
  id,
  title,
  price,
  discountPercentage,
  thumbnail,
  images = [],
  isNew,
  isSale,
  stock,
  category,
  description,
  rating,
  brand,
  tags
}: ProductCardProps) {
  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShop()
  const { toast } = useToast()

  const originalPrice = discountPercentage 
    ? price + (price * (discountPercentage / 100))
    : undefined

  const imageUrl = thumbnail || (images?.length > 0 ? images[0] : '/placeholder.jpg')

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Stop event bubbling
    
    const product = {
      id,
      title,
      price,
      discountPercentage,
      thumbnail,
      images,
      isNew,
      isSale,
      stock,
      category,
      description,
      rating,
      brand,
      tags
    }
    
    addToCart(product, 1)
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Stop event bubbling
    
    const product = {
      id,
      title,
      price,
      discountPercentage,
      thumbnail,
      images,
      isNew,
      isSale,
      stock,
      category,
      description,
      rating,
      brand,
      tags
    }
    
    toggleFavorite(product)
    toast({
      title: isFavorite(id) ? "Removed from favorites" : "Added to favorites",
      description: `${title} has been ${isFavorite(id) ? 'removed from' : 'added to'} your favorites.`,
    })
  }

  return (
    <div className="group relative flex flex-col rounded-lg">
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Image and Overlay Container */}
        <div className="relative aspect-[3/4]">
          <Link href={`/products/${id}`} className="block h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority
            />
          </Link>

          {/* Quick add overlay - Lower z-index */}
          {stock > 0 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/5 group-hover:opacity-100">
              <Button 
                type="button"
                onClick={handleAddToCart}
                className="translate-y-4 bg-white text-black opacity-0 transition-all duration-300 hover:bg-gray-100 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isInCart(id) ? 'Add More' : 'Quick Add'}
              </Button>
            </div>
          )}

          {/* Actions Container - Higher z-index than overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Wishlist button */}
            <button 
              type="button"
              onClick={handleToggleFavorite}
              className={`absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg pointer-events-auto ${
                isFavorite(id) ? 'text-red-500' : 'hover:text-red-500'
              }`}
            >
              <Heart className="h-4 w-4" fill={isFavorite(id) ? "currentColor" : "none"} />
              <span className="sr-only">Toggle favorite</span>
            </button>

            {/* Badges */}
            <div className="absolute left-3 top-3 flex gap-2">
              {isNew && (
                <Badge className="bg-blue-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                  NEW
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                  {Math.round(discountPercentage)}% OFF
                </Badge>
              )}
              {stock <= 5 && stock > 0 && (
                <Badge className="bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                  LOW STOCK
                </Badge>
              )}
              {stock === 0 && (
                <Badge className="bg-gray-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                  OUT OF STOCK
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <Link href={`/products/${id}`} className="group/link">
            <h3 className="font-medium text-gray-900 transition-colors duration-200 group-hover/link:text-blue-600">
              {title}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="text-sm font-medium text-red-500">
                {Math.round(discountPercentage)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}