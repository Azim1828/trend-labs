import { ProductCard } from "@/components/product-card"
import { Product } from "@/lib/shop"
import { Loader2 } from "lucide-react"

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  lastProductRef?: (node: HTMLDivElement) => void
}

export function ProductGrid({ products, isLoading = false, lastProductRef }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={index === products.length - 1 ? lastProductRef : undefined}
        >
          <ProductCard
            {...product}
            isNew={product.isNew || false}
            isSale={product.discountPercentage > 0}
          />
        </div>
      ))}
    </div>
  )
}

