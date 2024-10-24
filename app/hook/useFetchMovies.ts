import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../lib/movieapi";

const useFetchMovies = () => {
    return useInfiniteQuery({
        queryKey: ["movie"],
        queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: ({pages}) => pages.flatMap((page) =>  page.data)
    });
};
export default useFetchMovies;
