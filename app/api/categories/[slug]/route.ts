import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { ShopProduct, ShopCategory } from '@/lib/types'

const SHOP_FILE = path.join(process.cwd(), 'data/shop.json')

interface ShopData {
  products: ShopProduct[]
  categories: ShopCategory[]
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sort = searchParams.get('sort')

    const content = await fs.readFile(SHOP_FILE, 'utf-8')
    const data: ShopData = JSON.parse(content)
    
    let products = data.products.filter(
      (p) => p.category === params.slug
    )

    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price_asc':
          products.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          products.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          products.sort((a, b) => b.rating - a.rating)
          break
      }
    }

    // Apply pagination
    const total = products.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    products = products.slice(offset, offset + limit)

    return NextResponse.json({
      category: data.categories.find((c) => c.slug === params.slug),
      products,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit
      }
    })
  } catch (error: unknown) {
    console.error('Category API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category products' },
      { status: 500 }
    )
  }
} 