/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({movie}:any) {
    return (
        <div
            className="bg-gray-800 p-3 rounded-md shadow-md group"
        >
            <Image
                className="w-full h-64 object-cover rounded-md mb-4 scale-95 group-hover:scale-100 duration-200"
                width={500}
                height={300}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
            />
            <Link href={`/movies/${movie.id}`} className="text-xl font-semibold  hover:underline">
                {movie.title}
            </Link>
            <p className="text-gray-400">
                {movie.release_date}
            </p>
        </div>
    )
}
