import useFilmFetch from "../../lib/hooks/useFilmFetch"

export default function NowPlayingFilms() {

    const filmData = useFilmFetch('now_playing', 'Now Playing')
    return (
        <div>
            {filmData}
        </div>
    )
}