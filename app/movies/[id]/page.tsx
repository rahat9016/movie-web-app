/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { Suspense } from "react";
import CastSkelton from "../component/CastSkelton";

const CastOfMovie = React.lazy(() => import("../component/CastOfMovie"));
const Recommendation = React.lazy(() => import("../component/Recomandation"));

const fetchMovieDetails = async (id: any) => {
    const res = await (await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=79751aaa48b38a71885c3f44f9374db9`,
        { next: { revalidate: 60 } }
    )).json()

    return res
};


export default async function Movie({ params }: any) {
    const { id } = await params;

    const data = await fetchMovieDetails(id);



    return <div>
        <div>
            <div>
                <Image
                    className="w-full h-[320px] lg:h-[500px] object-fill rounded-md mb-4"
                    width={500}
                    height={300}
                    src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                    alt={data.title}
                />
                <div className="-mt-[220px] px-10 w-full lg:w-1/2 " >
                    <h1 className="text-3xl lg:text-5xl font-bold">{data.title}</h1>
                    <div className="flex items-center gap-3">
                        {data.genres.map((item: { id: string; name: string }) => <div key={item.id} className="min-w-[60px] h-[24px] bg-[#d1d5db8c] text-white px-4 flex items-center rounded-sm text-center text-sm">{item.name}</div>)}

                    </div>
                    <p className="mt-3 text-sm">{data.release_date}</p>
                    <p className="text-sm">{data.overview}</p>
                </div>
            </div>
            <div className="mt-32 px-10">
                <h1 className="text-2xl font-bold mb-5">Cast</h1>
                <Suspense fallback={<CastSkelton />}>
                    <CastOfMovie id={id} />
                </Suspense>
            </div>
            <div className="mt-8 px-10">
                <h1 className="text-2xl font-bold mb-5">Recommendations</h1>
                <Suspense fallback={<CastSkelton />}>
                    <Recommendation id={id} />
                </Suspense>
            </div>
        </div>
    </div>;
}
