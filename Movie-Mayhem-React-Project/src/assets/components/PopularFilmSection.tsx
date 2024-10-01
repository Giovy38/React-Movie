import useFilmFetch from "../utils/useFilmFetch"

export default function PoupularFilms() {

    const filmData = useFilmFetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', 'Popular')
    return (
        <div>
            {filmData}
        </div>
    )
}