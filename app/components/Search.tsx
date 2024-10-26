/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const fetchMovies = async (query: string) => {
    if (!query) return [];
    const resp = await (
        await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=79751aaa48b38a71885c3f44f9374db9&query=${query}`
        )
    ).json();
    return resp.results;
};

export default function Search() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [showSearchDown, setshowSearchDown] = useState(false);
    const dropdownRef = useRef<any>(null);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
            setshowSearchDown(query.length > 0);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const { data, isLoading } = useQuery(
        ["movies", debouncedQuery],
        () => fetchMovies(debouncedQuery),
        {
            enabled: !!debouncedQuery,
        }
    );

    const handleLinkClick = () => {
        setshowSearchDown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current?.contains(event.target)
            ) {
                setshowSearchDown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="relative  md:w-1/2" ref={dropdownRef}>
            <div className="h-10 bg-white px-4 rounded-sm">
                <input
                    value={query}
                    type="search"
                    className="w-full h-full text-black outline-none"
                    placeholder="Search movies..."
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setshowSearchDown(query.length > 0)}
                />
            </div>

            {showSearchDown && data && (
                <div className="h-[300px] lg:h-[600px] w-full absolute bg-white top-[42px] left-0 z-50 rounded-sm text-black overflow-y-scroll">
                    {data.length > 0 ? (
                        <ul className="mt-4">
                            {data.map((movie:{id: string; poster_path: string; title: string; release_date: string}) => (
                                <Link
                                    href={`/movies/${movie.id}`}
                                    key={movie.id}
                                    onClick={handleLinkClick}
                                    className="border-b py-2 hover:bg-slate-100 cursor-pointer px-3 min-h-[70px] flex items-center gap-3"
                                >
                                    <Image
                                        className="w-10 h-10 rounded-md"
                                        width={100}
                                        height={100}
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <div className="leading-none -mt-3">
                                        <h1 className="font-bold">
                                            {movie.title}
                                        </h1>
                                        <p className="text-sm text-gray-600">
                                            {movie.release_date}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        !isLoading && (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="mt-4 text-gray-500 text-center">
                                    No movies found.
                                </p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
