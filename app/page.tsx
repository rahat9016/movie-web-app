/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import MovieCard from "./components/MovieCard";

const fetchMovies = async ({
    pageParam = 1,
}): Promise<{ results: any[]; page: number }> => {
    const res = await (await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=79751aaa48b38a71885c3f44f9374db9&page=${pageParam}`
    )).json()
    
    return res;
};

export default function Home() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading } =
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

    if(isLoading) return <div>Loading...</div>
    if (error) return <div>Failed to load movies</div>;

    return (
        <div className="bg-gray-900 min-h-screen p-5 text-white  ">
            <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.pages.map((page) =>
                    page.results.map((movie) => {
                        return <MovieCard key={movie.id} movie={movie} />
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
