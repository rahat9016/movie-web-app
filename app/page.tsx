"use client";
import { useEffect, useState } from "react";
import { getMovies } from "./lib/movieapi";

export default function Home() {
    const [page, setPage] = useState<number>(1);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    // fetching data and store date in state
    useEffect(() => {
        const getMoviesFn = async () => {
            // if (loading || !hasMore) return;
            setLoading(true);
            const moviesdata = await getMovies(page);
            if (moviesdata) {
                setMovies((prevMovies) => [
                    ...prevMovies,
                    ...moviesdata.results,
                ]);
                setHasMore(page < moviesdata.total_pages);
            }
            setMovies(moviesdata?.results);
        };

        getMoviesFn();
    }, [hasMore, loading, page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.scrollHeight - 50
            ) {
              setPage((prevPage) => prevPage + 1);

            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    console.log(movies);
    return (
        <div className="h-[8000px]">
            {loading && <p>Loading...</p>}
            {movies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
            ))}
        </div>
    );
}
