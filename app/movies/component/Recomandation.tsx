/* eslint-disable @typescript-eslint/no-explicit-any */
import MovieCard from "@/app/components/MovieCard";

const fetchRecomandation = async (id: string) => {
    const res = await (await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=79751aaa48b38a71885c3f44f9374db9`,
        { next: { revalidate: 60 } }
    )).json()

    return res
};
export default async function Recommendation({ id }: { id: string }) {
    const { results } = await fetchRecomandation(id)
    if(!results) return null
    return <div>        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((movie: any) => {
                return <MovieCard key={movie.id} movie={movie} />
            })}
        </div>
    </div>
}