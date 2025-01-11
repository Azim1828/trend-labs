import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const SHOP_FILE = path.join(process.cwd(), 'data/shop.json')

async function getShopData() {
  const content = await fs.readFile(SHOP_FILE, 'utf-8')
  return JSON.parse(content)
}

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search')
    const category = searchParams.get('category')

    const shopData = await getShopData()
    let products = [...shopData.products]

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      )
    }

    // Category filtering - only apply if category is provided
    if (category) {
      products = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Calculate pagination
    const total = products.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedProducts = products.slice(offset, offset + limit)

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit
      }
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}