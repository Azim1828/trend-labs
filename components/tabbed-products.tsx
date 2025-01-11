'use client'

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Product } from "@/lib/shop"

type TabType = "bestSellers" | "newArrivals" | "topRated"

export function TabbedProducts() {
  const [activeTab, setActiveTab] = useState<TabType>("bestSellers")
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        limit: '6',
        sort: 'rating'
      })

      switch (activeTab) {
        case 'bestSellers':
          params.append('sort', 'rating')
          break
        case 'newArrivals':
          params.append('isNew', 'true')
          break
        case 'topRated':
          params.append('sort', 'rating')
          break
      }

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data.products)
    } catch (error: unknown) {
      console.error('Error fetching products:', error)
    }
  }, [activeTab])

  useEffect(() => {
    void fetchProducts()
  }, [fetchProducts])

  return (
    <section className="container mx-auto py-16">
      <div className="mb-8 flex justify-center gap-8 border-b">
        {[
          { id: "bestSellers", label: "Best Sellers" },
          { id: "newArrivals", label: "New Arrivals" },
          { id: "topRated", label: "Top Rated" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "relative pb-4 text-sm font-medium transition-colors hover:text-[#FF6B6B]",
              {
                "text-[#FF6B6B]": activeTab === tab.id,
                "text-muted-foreground": activeTab !== tab.id,
              }
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B6B]" />
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="font-medium group-hover:text-[#FF6B6B]">
                {product.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

