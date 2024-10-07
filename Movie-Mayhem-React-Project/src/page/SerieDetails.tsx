import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLikedFilms } from "../provider/LikedFilmContext";
import { useNotification } from "../provider/NotificationContext";
import SingleShowDetails from "../components/SingleShowDetails";

type episodeType = {
    air_date: string,
    episode_number: number,
    episode_type: string,
    id: number,
    name: string,
    overview: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number,
    vote_count: number
}
type searchType = {
    adult: boolean,
    backdrop_path: string,
    created_by: [],
    episode_run_time: [],
    first_air_date: string,
    genres: [],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: [],
    last_air_date: string,
    last_episode_to_air: episodeType,
    name: string,
    networks: [],
    next_episode_to_air: episodeType,
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: [],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: [],
    production_countries: [],
    seasons: [],
    spoken_languages: [],
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number
}


export default function SerieDetails() {

    const baseUrl = 'https://image.tmdb.org/t/p/w500/'
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [serie, setSerie] = useState<searchType | null>(null);
    const [img, setImg] = useState<string>("");
    const { likedFilms, addFilm, removeFilm } = useLikedFilms();
    const { showNotification } = useNotification();

    const isLiked = likedFilms.some((serie) => serie.id === Number(id));

    useEffect(() => {
        const fetchFilmDetails = async () => {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWY4MzY4YmM5YTY3ZWE0MjZhNjc2NGY4MGRkN2NmZCIsIm5iZiI6MTcyNzcwNjcyMy4wMzg3NzUsInN1YiI6IjY2M2RmMGE0Yzk3YWIwMDQ1YzUxMjg5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yra5bSgyZu43keh2vIShwvwltallZ1vCF38G2Rv1abc'
                }
            };
            try {
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US'`, options);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: searchType = await res.json();
                setLoading(false);
                console.log(data);
                setSerie(data);
                if (data.poster_path === null) {
                    setImg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s')
                } else {
                    setImg(`${baseUrl}${data.poster_path}`);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchFilmDetails();
    }, [id]);

    const toggleLike = () => {
        if (!isLiked) {
            addFilm({ id: Number(id), title: serie?.name ?? '', imgUrl: img, release_date: serie?.first_air_date ?? '' });
            showNotification(`${serie?.name} added to liked films!`, "success");
        } else {
            removeFilm(Number(id));
            showNotification(`${serie?.name} removed from liked films!`, "error");
        }
    }

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[45vh]">
                <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
            </div>
        )
    }

    return (
        <SingleShowDetails
            img={img}
            isLiked={isLiked}
            toggleLike={toggleLike}
            show={serie as searchType}
        />
    )

}