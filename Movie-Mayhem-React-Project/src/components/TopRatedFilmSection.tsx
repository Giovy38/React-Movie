import useFilmFetch from "../lib/hooks/useFilmFetch"

export default function TopRatedFilms() {

    const filmData = useFilmFetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', 'Top Rated')
    return (
        <div>
            {filmData}
        </div>
    )
}