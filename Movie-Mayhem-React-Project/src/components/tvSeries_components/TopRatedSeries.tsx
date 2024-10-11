import useSeriesFetch from "../../lib/hooks/useSeriesFetch"

export default function TopRatedSeries() {

    const SeriesData = useSeriesFetch('top_rated', 'Top Rated')
    return (
        <div>
            {SeriesData}
        </div>
    )
}