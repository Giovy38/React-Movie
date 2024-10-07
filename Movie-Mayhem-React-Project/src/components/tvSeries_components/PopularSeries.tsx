import useSeriesFetch from "../../lib/hooks/useSeriesFetch"

export default function PopularSeries() {

    const SeriesData = useSeriesFetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', 'Popular')
    return (
        <div>
            {SeriesData}
        </div>
    )
}