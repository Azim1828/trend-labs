'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Category } from "@/lib/shop"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ShopSidebarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

export function ShopSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: ShopSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)
  const debouncedSearch = useDebounce(localSearchTerm, 500)

  useEffect(() => {
    setSearchTerm(debouncedSearch)
  }, [debouncedSearch, setSearchTerm])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.sort((a: Category, b: Category) => 
        a.name.localeCompare(b.name)
      ))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Search</h2>
          {localSearchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLocalSearchTerm("")
                setSearchTerm("")
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Input
          type="search"
          placeholder="Search products..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Categories</h2>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              className="justify-between"
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
            >
              <span className="truncate">{category.name}</span>
              {category.productCount && category.productCount > 0 && (
                <span className={`ml-2 rounded-full bg-muted px-2 py-0.5 text-xs ${selectedCategory === category.name ? 'bg-red-500 text-white' : ''}`}>
                  {category.productCount}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}