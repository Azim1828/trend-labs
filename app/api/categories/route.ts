import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { ShopProduct } from '@/lib/types'

const SHOP_FILE = path.join(process.cwd(), 'data/shop.json')

interface ShopData {
  products: ShopProduct[]
}

export async function GET() {
  try {
    const content = await fs.readFile(SHOP_FILE, 'utf-8')
    const data: ShopData = JSON.parse(content)
    
    // Get unique categories and normalize them
    const uniqueCategories = data.products
      .map(p => p.category)
      .filter((category, index, array) => array.indexOf(category) === index)
      .map(category => ({
        original: category,
        normalized: category.toLowerCase().replace(/['\s-]+/g, '-')
      }))
    
    // Create category objects with normalized slugs
    const categories = uniqueCategories.map(({ original, normalized }) => {
      const count = data.products.filter(
        (product) => product.category.toLowerCase() === original.toLowerCase()
      ).length

      return {
        name: original,
        slug: normalized,
        url: `/shop?category=${encodeURIComponent(original)}`,
        productCount: count
      }
    })

    return NextResponse.json(
      categories.sort((a, b) => a.name.localeCompare(b.name))
    )
  } catch (error: unknown) {
    console.error('Categories API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
} 