import useSeriesFetch from "../../lib/hooks/useSeriesFetch"

export default function PopularSeries() {

    const SeriesData = useSeriesFetch('popular', 'Popular')
    return (
        <div>
            {SeriesData}
        </div>
    )
}