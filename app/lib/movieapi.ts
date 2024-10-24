/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = "https://api.themoviedb.org";
const API_KEY = "79751aaa48b38a71885c3f44f9374db9";

export async function getMovies(page) {
    try {
        const PER_PAGE = 20
        const url = new URL(`${API_URL}/3/movie/popular?api_key=${API_KEY}`)

        const resp = await fetch(url, { method:"GET" });
        if (!resp.ok) {
            throw new Error("Failed to fetch.");
        }
        const responseData = await resp.json();

        const { results } = responseData

        const movieHasNextPage = results.length === PER_PAGE
        const nextPage = movieHasNextPage ? results[results.length-1].id : null
        
        return {
            data: results,
            nextPage
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

