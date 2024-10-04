import useSeriesFetch from "../../utils/useSeriesFetch"

export default function OnTheAirSeries() {

    const SeriesData = useSeriesFetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', 'On The Air')
    return (
        <div>
            {SeriesData}
        </div>
    )
}