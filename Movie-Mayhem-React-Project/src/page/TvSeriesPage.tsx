import OnTheAir from "../components/tvSeries_components/OnTheAirSeries";
import Popular from "../components/tvSeries_components/PopularSeries";
import TopRated from "../components/tvSeries_components/TopRatedSeries";
import AiringToday from "../components/tvSeries_components/AiringTodaySeries";

export default function TvSeriesPage() {
    return (
        <div>
            <TopRated />
            <Popular />
            <OnTheAir />
            <AiringToday />
        </div>
    )
}