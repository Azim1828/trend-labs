/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { ProductGrid } from "@/components/shop/product-grid"
import { ShopSidebar } from "@/components/shop/shop-sidebar"
import { Product, PaginationData } from "@/lib/shop"
import { Loader2, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function ShopLayout() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 12
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isFiltered, setIsFiltered] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  // Reset pagination when filters change
  useEffect(() => {
    setProducts([])
    setPagination(prev => ({ ...prev, currentPage: 1 }))
    setHasMore(true)
    setIsInitialLoad(true)
    setIsFiltered(searchTerm !== "" || selectedCategory !== null)
    fetchProducts(1)
  }, [searchTerm, selectedCategory])

  const fetchProducts = async (page: number) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory })
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      if (isInitialLoad) {
        setProducts(data.products)
        setIsInitialLoad(false)
      } else {
        setProducts(prev => [...prev, ...data.products])
      }

      setPagination(data.pagination)
      setHasMore(data.pagination.currentPage < data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
  }

  useEffect(() => {
    if (isInitialLoad) {
      fetchProducts(1)
    }
  }, [searchTerm, selectedCategory])

  // Last element ref callback for infinite scrolling
  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return
    
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        const nextPage = pagination.currentPage + 1
        fetchProducts(nextPage)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [isLoading, hasMore, pagination.currentPage])

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8">
      {/* Mobile filter button */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background p-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="mt-4">
              <ShopSidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                
              />
            </div>
          </SheetContent>
        </Sheet>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        )}
      </div>

      <div className="w-full lg:w-3/4">
        <ProductGrid 
          products={products} 
          isLoading={isLoading && isInitialLoad}
          lastProductRef={lastProductRef}
        />
        
        {/* Loading indicator for infinite scroll */}
        {isLoading && !isInitialLoad && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* End of results message */}
        {!isLoading && !hasMore && products.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No more products to load
          </div>
        )}

        {/* No results message */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No products found matching your criteria
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden w-full lg:block lg:w-1/4">
        <div className="sticky top-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            {isFiltered && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset All
              </Button>
            )}
          </div>
          <ShopSidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            
          />
        </div>
      </div>
    </div>
  )
}

