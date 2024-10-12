import { AiOutlineLoading3Quarters } from "react-icons/ai"
import useSeriesFetch from "../../lib/hooks/useSeriesFetch"
import ShowList from "../ShowList"

export default function OnTheAirSeries() {

    const { series, loading } = useSeriesFetch('on_the_air')

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
            </div>
        )
    }

    return (
        <ShowList
            shows={series.map(serie => ({
                id: serie.id,
                poster_path: serie.poster_path,
                title: serie.name,
                release_date: serie.first_air_date
            })) || []}
            loading={loading}
            sectionTitle='On The Air'
            isFilm={false}
        />
    )
}