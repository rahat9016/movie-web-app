import CastCard from "./CastCard";

const fetchMovieCast = async (id: string) => {
    const res = (
        await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=79751aaa48b38a71885c3f44f9374db9`,
            { next: { revalidate: 60 } }
        )
    ).json();
    return res;
};

export default async function CastOfMovie({ id }: {id: string}) {
    const { cast } = await fetchMovieCast(id);
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center px-6">
                {cast.map((item:{name: string; id: string; character: string; profile_path: string}) => {
                    return (
                        <CastCard key={item.id} cast={item}/>
                    );
                })}
            </div>
        </div>
    );
}
