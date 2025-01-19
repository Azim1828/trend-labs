"use client";

import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/shop";
import { useEffect, useState } from "react";

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const response = await fetch(
        "/api/products?limit=4&sort=rating&isNew=true&page=2"
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    }
  };

  return (
    <section className="w-full py-16">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">New Arrivals</h2>
          <p className="text-muted-foreground">
            Discover our latest collection of premium fashion items
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
