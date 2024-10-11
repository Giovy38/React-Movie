import useFilmFetch from "../../lib/hooks/useFilmFetch"

export default function UpcomingFilms() {

    const filmData = useFilmFetch('upcoming', 'Upcoming')
    return (
        <div>
            {filmData}
        </div>
    )
}