interface Product {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    isNew?: boolean
    isSale?: boolean
  }

export const products: Product[] = [
    {
      id: "1",
        name: "Elegant Summer Dress",
      price: 999.99,
      originalPrice: 1299.99,
      image: "/product/111.jpg",
      isNew: true,
      isSale: true
    },
    {
      id: "2",
      name: "Classic Leather Bag",
      price: 1009.99,
      image: "/product/222.jpg",
      isNew: true,
      isSale: true
    },
    {
      id: "3",
      name: "Designer Sunglasses",
      price: 1159.99,
      originalPrice: 1999.99,
      image: "/product/333.jpg",
      isNew: true,
      isSale: true
    },
    {
      id: "4",
      name: "Premium Watch",
      price: 1299.99,
      image: "/product/444.jpg",
      isNew: true,
      isSale: true
    }
  ]


  export const newArrivals = products.filter((product) => product.isNew);

  export const mostPopular = products.filter((product) => product.isSale);

  export const bestSellers = products.filter((product) => product.isSale);

  export const topRated = products.filter((product) => product.isSale);