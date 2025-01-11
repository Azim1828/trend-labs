import { CartItems } from "@/components/cart-items";

export default function CartPage() {
    return (
        <main className="container mx-auto py-10">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
        <CartItems />
      </main>
    )
}