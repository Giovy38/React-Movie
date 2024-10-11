import useSeriesFetch from "../../lib/hooks/useSeriesFetch"

export default function OnTheAirSeries() {

    const SeriesData = useSeriesFetch('on_the_air', 'On The Air')
    return (
        <div>
            {SeriesData}
        </div>
    )
}