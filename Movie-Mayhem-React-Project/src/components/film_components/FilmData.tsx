import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useFilmFetch from "../../lib/hooks/useFilmFetch";
import ShowList from "../ShowList";

type FilmType = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

type FilmDataProps = {
    type: FilmType;
    sectionTitle: string;
};

export default function FilmData({ type, sectionTitle }: FilmDataProps) {
    const { films, loading } = useFilmFetch(type)

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
            </div>
        )
    }

    return (
        <ShowList
            shows={films.map(film => ({
                id: film.id,
                poster_path: film.poster_path,
                title: film.title,
                release_date: film.release_date
            })) || []}
            loading={loading}
            sectionTitle={sectionTitle}
            isFilm={true}
        />
    )
}
