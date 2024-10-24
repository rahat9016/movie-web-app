/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

const fetchMovies = async ({
    pageParam = 1,
}): Promise<{ results: any[]; page: number }> => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=79751aaa48b38a71885c3f44f9374db9&page=${pageParam}`
    );
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
};

export default function Home() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
        useInfiniteQuery("movies", fetchMovies, {
            getNextPageParam: (lastPage) => lastPage.page + 1,
        });

    const observerRef = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            console.log(entries)
            const target = entries[0];
            if (target.isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 1,
        });
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    if (error) return <div>Failed to load movies</div>;

    return (
        <div className="bg-gray-900 min-h-screen p-5 text-white">
            <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.pages.map((page) =>
                    page.results.map((movie) => {
                        console.log(movie.backdrop_path
                        )
                        return <div
                            key={movie.id}
                            className="bg-gray-800 p-3 rounded-md shadow-md"
                        >
                            <Image
                                className="w-full h-64 object-cover rounded-md mb-4"
                                width={500}
                                height={300}
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                alt={movie.title}
                            />
                            <h2 className="text-xl font-semibold">
                                {movie.title}
                            </h2>
                            <p className="text-gray-400">
                                {movie.release_date}
                            </p>
                        </div>
                    })
                )}
            </div>
            <div ref={observerRef} className="mt-10 text-center">
                {isFetchingNextPage ? (
                    <p>Loading more movies...</p>
                ) : (
                    hasNextPage && <p>Scroll down to load more</p>
                )}
            </div>
        </div>
    );
}
