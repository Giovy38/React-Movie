import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLikedFilms } from "../provider/LikedFilmContext";
import { useNotification } from "../provider/NotificationContext";
import SingleShowDetails from "../components/SingleShowDetails";
import { imgBaseUrl } from "../config";



type searchType = {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: null,
    budget: number,
    genres: [],
    homepage: string,
    id: number,
    imdb_id: string,
    origin_country: [],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: [],
    production_countries: [],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: [],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}


export default function FilmDetails() {


    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [film, setFilm] = useState<searchType | null>(null);
    const [img, setImg] = useState<string>("");
    const { likedFilms, addFilm, removeFilm } = useLikedFilms();
    const { showNotification } = useNotification();

    const isLiked = likedFilms.some((film) => film.id === Number(id));

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
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: searchType = await res.json();
                setLoading(false);
                setFilm(data);
                if (data.poster_path === null) {
                    setImg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s')
                } else {
                    setImg(`${imgBaseUrl}${data.poster_path}`);
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
            addFilm({
                id: Number(id), title: film?.title ?? '', imgUrl: img, release_date: film?.release_date ?? '',
                isFilm: true
            });
            showNotification(`${film?.title} added to liked films!`, "success");
        } else {
            removeFilm(Number(id));
            showNotification(`${film?.title} removed from liked films!`, "error");
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
            show={film as searchType}
            isFilm={true}
        />
    )

}