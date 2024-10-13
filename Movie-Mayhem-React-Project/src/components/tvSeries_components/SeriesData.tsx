import { AiOutlineLoading3Quarters } from "react-icons/ai"
import useSeriesFetch from "../../lib/hooks/useSeriesFetch"
import ShowList from "../ShowList"



type SeriesType = 'popular' | 'airing_today' | 'top_rated' | 'on_the_air';

type SeriesDataProps = {
    type: SeriesType;
    sectionTitle: string;
};

export default function SeriesData({ type, sectionTitle }: SeriesDataProps) {

    const { series, loading } = useSeriesFetch(type)

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
            </div>
        )
    }

    return (
        <ShowList
            shows={series?.map(serie => ({
                id: serie.id,
                poster_path: serie.poster_path,
                title: serie.name,
                release_date: serie.first_air_date
            })) || []}
            loading={loading}
            sectionTitle={sectionTitle}
            isFilm={false}
        />
    )
}