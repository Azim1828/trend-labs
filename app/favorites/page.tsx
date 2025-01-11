import { FavoriteItems } from "@/components/favourite-items";

export default function FavoritesPage() {
    return (
        <main className="container mx-auto py-10">
        <h1 className="mb-8 text-3xl font-bold">My Favorites</h1>
        <FavoriteItems />
      </main>
    )
}