import useFilmFetch from "../utils/useFilmFetch"

export default function UpcomingFilms() {

    const filmData = useFilmFetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', 'Upcoming')
    return (
        <div>
            {filmData}
        </div>
    )
}