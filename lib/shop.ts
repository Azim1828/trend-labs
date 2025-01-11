export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  isNew?: boolean
  isSale?: boolean
  tags: string[]
  images: string[]
  thumbnail: string
}

export interface Category {
  slug: string
  name: string
  url: string
  productCount?: number
}

export interface PaginationData {
  total: number
  totalPages: number
  currentPage: number
  limit: number
}

export interface ProductsResponse {
  products: Product[]
  pagination: PaginationData
}

export interface CategoryResponse {
  category: Category
  products: Product[]
  pagination: PaginationData
}

export const defaultPagination = {
  page: 1,
  limit: 12
}

export const sortOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' }
] 