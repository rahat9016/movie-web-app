const API_URL = 'https://api.themoviedb.org'
const API_KEY= '79751aaa48b38a71885c3f44f9374db9'

export async function getMovies(page:number) {
    try {
        // console.log('env->', process.env)
        const resp = await fetch(
            `${API_URL}/3/movie/popular?api_key=${API_KEY}&page=${page}`, {
                cache: "force-cache"
            }
        );
        if (resp.ok) {
            const responseData = await resp.json();
            return responseData;
        }
    } catch (error) {
        console.log(error)
    }
}
