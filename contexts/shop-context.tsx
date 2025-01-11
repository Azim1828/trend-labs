'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '@/lib/shop'

interface CartItem {
  product: Product
  quantity: number
}

interface ShopContextType {
  cart: CartItem[]
  favorites: Product[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateCartQuantity: (productId: number, quantity: number) => void
  toggleFavorite: (product: Product) => void
  isInCart: (productId: number) => boolean
  isFavorite: (productId: number) => boolean
  cartCount: number
  cartTotal: number
  clearCart: () => void
}

const ShopContext = createContext<ShopContextType | undefined>(undefined)

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Product[]>([])

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedFavorites = localStorage.getItem('favorites')
    
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  // Save cart and favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...prevCart, { product, quantity }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(p => p.id === product.id)
      
      if (isFavorite) {
        return prevFavorites.filter(p => p.id !== product.id)
      }
      
      return [...prevFavorites, product]
    })
  }

  const isInCart = (productId: number) => {
    return cart.some(item => item.product.id === productId)
  }

  const isFavorite = (productId: number) => {
    return favorites.some(product => product.id === productId)
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleFavorite,
        isInCart,
        isFavorite,
        cartCount,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
} 