export interface ShopProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  thumbnail: string
}

export interface ShopCategory {
  slug: string
  name: string
  url: string
  productCount?: number
} 