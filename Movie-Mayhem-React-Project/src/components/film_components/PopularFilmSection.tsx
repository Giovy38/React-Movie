import useFilmFetch from "../../lib/hooks/useFilmFetch"

export default function PopularFilms() {

    const filmData = useFilmFetch('popular', 'Popular')
    return (
        <div>
            {filmData}
        </div>
    )
}