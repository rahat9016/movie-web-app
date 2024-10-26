'use client'
import Link from "next/link"
import { useWishlist } from "../context/wishlist"

export default function Wishlist() {
  const { Wishlist, removeFromWishlist } = useWishlist()

  if(Wishlist.length === 0) return <div className="w-full h-[100vh] flex items-center justify-center">No wishlist</div>
  return (
    <div className="px-4 py-10">
      <h1>My Watchlist</h1>
      <ul>
        {Wishlist.map((movie: { id: string; title: string }) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
            <button onClick={() => removeFromWishlist(movie.id)} className="bg-rose-600 px-3 rounded-sm">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
