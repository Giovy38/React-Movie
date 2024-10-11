import useSeriesFetch from "../../lib/hooks/useSeriesFetch"

export default function AiringTodaySeries() {

    const SeriesData = useSeriesFetch('airing_today', 'Airing Today')
    return (
        <div>
            {SeriesData}
        </div>
    )
}