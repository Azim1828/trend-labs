'use client'

import { useState } from "react"
import Image from "next/image"
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/shop"
import { Badge } from "@/components/ui/badge"
import { useShop } from "@/contexts/shop-context"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShop()
  const { toast } = useToast()

  const originalPrice = product.discountPercentage 
    ? product.price + (product.price * (product.discountPercentage / 100))
    : undefined

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product)
    toast({
      title: isFavorite(product.id) ? "Removed from favorites" : "Added to favorites",
      description: `${product.title} has been ${isFavorite(product.id) ? 'removed from' : 'added to'} your favorites.`,
    })
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.images[selectedImage]}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
          {product.isNew && (
            <Badge className="absolute left-4 top-4 bg-blue-500">NEW</Badge>
          )}
          {product.discountPercentage > 0 && (
            <Badge className="absolute left-4 top-4 bg-red-500">
              {Math.round(product.discountPercentage)}% OFF
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                selectedImage === index ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{product.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Stock: {product.stock} units available
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4">
            <Button 
              className="flex-1" 
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isInCart(product.id) ? 'Add More' : 'Add to Cart'}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleToggleFavorite}
              className={isFavorite(product.id) ? "text-red-500" : ""}
            >
              <Heart className="h-4 w-4" fill={isFavorite(product.id) ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div>
            <h2 className="text-sm font-medium">Brand</h2>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium">Category</h2>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium">Tags</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

