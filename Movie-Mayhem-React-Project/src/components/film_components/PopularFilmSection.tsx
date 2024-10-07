import useFilmFetch from "../../lib/hooks/useFilmFetch"

export default function PopularFilms() {

    const filmData = useFilmFetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', 'Popular')
    return (
        <div>
            {filmData}
        </div>
    )
}