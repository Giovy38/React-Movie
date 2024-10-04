import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { TbRating18Plus } from "react-icons/tb";
import { FaStar,FaStarHalfStroke, FaRegHeart, FaHeart } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLikedFilms } from "../provider/LikedFilmContext";
import { useNotification } from "../provider/NotificationContext";

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
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [serie, setSerie] = useState<searchType | null>(null);
    const [img, setImg] = useState<string>("");
    const { likedFilms, addFilm, removeFilm} = useLikedFilms();
    const {showNotification} = useNotification();

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
                if(!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: searchType = await res.json();
                setLoading(false);
                console.log(data);
                setSerie(data);
                if(data.poster_path === null) {
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

    const toggleLike = ()=>{
        if(!isLiked){
            addFilm({id: Number(id), title: serie?.name?? '', imgUrl: img, release_date: serie?.first_air_date?? ''});
            showNotification(`${serie?.name} added to liked films!`, "success");
        } else {
            removeFilm(Number(id));
            showNotification(`${serie?.name} removed from liked films!`, "error");
        }
    }
    
    if(loading) {
        return(
            <div className="w-full flex justify-center items-center min-h-[45vh]">
                <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin"/>
            </div>
        )
    }
    


    return(
        <div className="min-h-[70vh] xl:min-h-[45vh] p-10 flex justify-around flex-col lg:flex-row items-center">
            <div className="flex flex-col text-white gap-3 items-center">
                {/* image */}
                <img className="w-[200px] md:w-[250px] lg:w-[300px] lg:mr-10 rounded-xl" src={img} alt="film poster" />
                {/* liked? */}
                {isLiked ? 
                <div className="bg-green-900 rounded-full p-2 font-extrabold text-sm font-mono max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
                    <h5>This film is in your liked films</h5>
                </div> 
                : null}
                {isLiked ? <FaHeart className="text-3xl md:text-4xl text-white hover:cursor-pointer" onClick={toggleLike}/> : <FaRegHeart className="text-3xl md:text-4xl text-white hover:cursor-pointer" onClick={toggleLike}/>}
            </div>
            <div className="text-white flex flex-col gap-2 items-center text-center lg:text-left">
                {/* title */}
                <h1 className="text-[40px] md:text-[50px] lg:text-[60px] font-bold uppercase font-mono text-balance text-[#f5c518]">{serie?.name}</h1>
                {/* number of season */}
                <h4 className="text-lg md:text-xl">({serie?.number_of_seasons} season | {serie?.number_of_episodes} episodes)</h4>
                {/* last episode */}
                <p className="text-lg"> <span className="text-[#f5c518] italic text-lg md:text-xl">Last episode:</span> {serie?.last_episode_to_air?.name} ({serie?.last_episode_to_air?.runtime} minutes)</p>
                {/* status */}
                {serie?.status === 'Returning Series' ? 
                <h3 className="uppercase text-black bg-yellow-500 rounded-full p-2 font-extrabold text-md font-mono">{serie?.status}</h3> : serie?.status === 'Ended' ?
                <h3 className="uppercase text-black bg-green-500 rounded-full p-2 font-extrabold text-md font-mono">{serie?.status}</h3> 
                : serie?.status === "Canceled" ?
                <h3 className="uppercase text-black bg-red-500 rounded-full p-2 font-extrabold text-md font-mono">{serie?.status}</h3> 
                :
                <h3 className="uppercase font-extrabold text-md font-mono">{serie?.status}</h3>}
                {/* genres */}
                <h3 className="uppercase text-lg md:text-xl"> <span className="text-[#f5c518] italic text-lg md:text-xl capitalize">Genres:</span> {serie?.genres.map((genre: { id: number, name: string}) => genre.name).join(" • ") }</h3>
                {/* adult */}
                {serie?.adult ? <TbRating18Plus className="text-[30px] md:text-[40px] text-red-700" /> : null} 
                {/* first air date */}
                <p className="text-lg"> <span className="text-[#f5c518] italic text-lg md:text-xl">First Air Date:</span> {serie?.first_air_date}</p>
                {/* description */}
                <p className="text-base md:text-lg text-balance text-center">{serie?.overview}</p>
                {/* product companies */}
                <span className="text-[#f5c518] italic text-lg md:text-xl capitalize">Production Companies:</span> 
                <div className="flex justify-center items-center gap-5 bg-slate-300 p-3 rounded-2xl">
    {
        serie?.production_companies.map((company: { id: number, name: string, logo_path: string}) => 
            company.logo_path ?
        <img className="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] object-contain" src={`${baseUrl}${company.logo_path}`} alt="product company logo" key={company.id}/> : null)
    }
</div>
                <h3 className="uppercase text-balance text-center"> {serie?.production_companies.map((company: { id: number, name: string, logo_path: string}) => company.name).join(" • ") }</h3>
                {/* vote */}
                <div className="flex gap-2 w-full justify-center items-center text-lg md:text-xl">
                    <span className=" italic">Vote :</span>
                    {
                        Array.from({length: Math.floor(serie?.vote_average ?? 0)}, (_, i) => i+1).map((vote) => 
                        <FaStar className="text-[#f5c518] hover:scale-125 hover:cursor-pointer" 
                        key={vote} />)
                    }
                    {
                        (serie?.vote_average ?? 0) % 1 !== 0 ? <FaStarHalfStroke className="text-[#f5c518] hover:scale-125 hover:cursor-pointer" /> : null
                    }
                    <p>({(serie?.vote_average ?? 0).toFixed(1)})</p>
                </div>
    
            </div>
        </div>
    )
    
}