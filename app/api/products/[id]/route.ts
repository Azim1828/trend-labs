import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { ShopProduct } from '@/lib/types'

const SHOP_FILE = path.join(process.cwd(), 'data/shop.json')

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const content = await fs.readFile(SHOP_FILE, 'utf-8')
    const data = JSON.parse(content)
    
    const product = data.products.find(
      (p: ShopProduct) => p.id === parseInt(params.id)
    )

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error: unknown) {
    console.error('Product API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
} 