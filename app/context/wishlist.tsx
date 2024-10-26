/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
interface  IMovie{
  id: string;
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
}
interface IWishlistContextType {
  Wishlist: IMovie[];
  addToWishlist: (movie: IMovie) => void;
  removeFromWishlist: (movieId: string) => void;
}



const WishlistContext = createContext<IWishlistContextType>({
  Wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});


export const WishlistProvider = ({ children }:{children: React.ReactNode}) => {
  const [Wishlist, setWishlist] = useState<IMovie[]>([]);

  
  useEffect(() => {
    const wish = localStorage.getItem("Wishlist") ?? "[]";
    const storedWishlist: IMovie[] = JSON.parse(wish);
    setWishlist(storedWishlist);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("Wishlist", JSON.stringify(Wishlist));
  }, [Wishlist]);

  const addToWishlist = (movie: any) => {
    console.log(movie)
    setWishlist((prev) => [...prev, movie]);
  };

  const removeFromWishlist = (movieId: string) => {
    setWishlist((prev) => prev.filter((movie:{ id: string}) => movie.id !== movieId));
  };

  return (
    <WishlistContext.Provider value={{ Wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
};

export const useWishlist = () => useContext(WishlistContext);
