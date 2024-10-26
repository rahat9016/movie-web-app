/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default async function CastCard({cast}:any){
    return <div key={cast.id} className="flex items-center w-full gap-2">
    <Image
        className="w-16 h-16 rounded-full mb-4"
        width={100}
        height={100}
        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
        alt={cast.name}
    />
    <div>
    <h1>{cast.name}</h1>
    <p className="text-xs text-gray-400">{cast.character}</p>
    </div>
</div>
}