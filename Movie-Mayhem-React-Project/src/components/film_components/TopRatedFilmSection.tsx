import useFilmFetch from "../../lib/hooks/useFilmFetch"

export default function TopRatedFilms() {

    const filmData = useFilmFetch('top_rated', 'Top Rated')
    return (
        <div>
            {filmData}
        </div>
    )
}