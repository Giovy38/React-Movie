import OnTheAir from "./tvSeries_components/OnTheAirSeries";
import Popular from "./tvSeries_components/PopularSeries";
import TopRated from "./tvSeries_components/TopRatedSeries";
import AiringToday from "./tvSeries_components/AiringTodaySeries";

export default function TvSeriesPage() {
    return(
        <div>
           <TopRated />
           <Popular />
           <OnTheAir />
           <AiringToday />
        </div>
    )
}