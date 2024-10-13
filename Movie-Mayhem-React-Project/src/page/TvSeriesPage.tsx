import SeriesData from "../components/tvSeries_components/SeriesData";

export default function TvSeriesPage() {
    return (
        <div>
            <SeriesData type='top_rated' sectionTitle="Top Rated" />
            <SeriesData type='popular' sectionTitle="Popular" />
            <SeriesData type='on_the_air' sectionTitle="On the Air" />
            <SeriesData type='airing_today' sectionTitle="Airing Today" />
        </div>
    )
}