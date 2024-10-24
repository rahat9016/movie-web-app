import useFetchMovies from "./useFetchMovies"


const useInfiniteScroll = () => {
    const {data, fetchNextPage, isFetchingNextPage } = useFetchMovies()
    console.log(data)
}

export default useInfiniteScroll