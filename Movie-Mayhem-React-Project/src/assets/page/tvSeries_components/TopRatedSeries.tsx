import useSeriesFetch from "../../utils/useSeriesFetch"

export default function TopRatedSeries() {

    const SeriesData = useSeriesFetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', 'Top Rated')
    return (
        <div>
            {SeriesData}
        </div>
    )
}