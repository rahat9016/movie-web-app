
"use client";
import { useWishlist } from "../context/wishlist";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WishlistBtn({ movie }: any) {
    const { Wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isInWishlist = Wishlist.some(
        (item: { id: string }) => item.id === movie.id
    );

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist(movie.id);
        } else {
            addToWishlist(movie);
        }
    };
    return (
        <button
            onClick={handleToggleWishlist}
            className="bg-green-500 px-3 py-2 rounded-md"
        >
            <span className="text-lg inline-block font-bold">+</span>{" "}
            {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </button>
    );
}
