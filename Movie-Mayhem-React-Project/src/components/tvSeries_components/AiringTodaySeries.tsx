import useSeriesFetch from "../../lib/hooks/useSeriesFetch"

export default function AiringTodaySeries() {

    const SeriesData = useSeriesFetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', 'Airing Today')
    return (
        <div>
            {SeriesData}
        </div>
    )
}