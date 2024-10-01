import useFilmFetch from "../utils/useFilmFetch"

export default function NowPlayingFilms() {

    const filmData = useFilmFetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', 'Now Playing')
    return (
        <div>
            {filmData}
        </div>
    )
}