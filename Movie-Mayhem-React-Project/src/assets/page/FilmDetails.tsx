import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { TbRating18Plus } from "react-icons/tb";
import { FaStar,FaStarHalfStroke, FaRegHeart, FaHeart } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLikedFilms } from "../provider/LikedFilmContext";
import { useNotification } from "../provider/NotificationContext";


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

    const baseUrl = 'https://image.tmdb.org/t/p/w500/'
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [film, setFilm] = useState<searchType | null>(null);
    const [img, setImg] = useState<string>("");
    const { likedFilms, addFilm, removeFilm} = useLikedFilms();
    const {showNotification} = useNotification();

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
                if(!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: searchType = await res.json();
                setLoading(false);
                setFilm(data);
                setImg(`${baseUrl}${data.poster_path}`);
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
            addFilm({id: Number(id), title: film?.title?? '', imgUrl: img, release_date: film?.release_date?? ''});
            showNotification(`${film?.title} added to liked films!`, "success");
        } else {
            removeFilm(Number(id));
            showNotification(`${film?.title} removed from liked films!`, "error");
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
        <div className="min-h-[45vh] p-10 flex justify-around ">
            <div className="flex flex-col text-white gap-3 items-center">
                {/* image */}
                <img className="w-[300px] rounded-xl" src={img} alt="film poster" />
                {/* liked? */}
                {isLiked ? 
                <div className="bg-green-900 rounded-full p-2 font-extrabold text-sm font-mono max-w-[300px]">
                    <h5>This film is in your liked films</h5>
                </div> 
                : null}
                {isLiked ? <FaHeart className="text-4xl text-white hover:cursor-pointer" onClick={toggleLike}/> : <FaRegHeart className="text-4xl text-white hover:cursor-pointer" onClick={toggleLike}/>}
            </div>
            <div className="text-white flex flex-col gap-2 items-center">
                
                {/* title */}
                <h1 className="text-[60px] font-bold uppercase font-mono text-balance text-[#f5c518]">{film?.title}</h1>
                {/* runtime */}
                <h4>({film?.runtime} minutes)</h4>
                {/* status */}
                {film?.status === 'Released' ? 
                <h3 className="uppercase text-black bg-green-500 rounded-full p-2 font-extrabold text-md font-mono">{film?.status}</h3> : 
                <h3 className="uppercase font-extrabold text-md font-mono">{film?.status}</h3>}
                {/* genres */}
                <h3 className="uppercase"> <span className="text-[#f5c518] italic text-xl capitalize">Genres:</span> {film?.genres.map((genre: { id: number, name: string}) => genre.name).join(" • ") }</h3>
                {/* adult */}
                {film?.adult ? <TbRating18Plus className="text-[40px] text-red-700" /> : null} 
                {/* release date */}
                <p className="text-lg"> <span className="text-[#f5c518] italic text-xl">Released Date:</span> {film?.release_date}</p>
                {/* description */}
                <p className="text-xl text-balance ">{film?.overview}</p>
                {/* product companies */}
                <span className="text-[#f5c518] italic text-xl capitalize">Production Companies:</span> 
                <div className="flex justify-center items-center gap-5 bg-slate-300 p-3 rounded-2xl">
                    {
                        film?.production_companies.map((company: { id: number, name: string, logo_path: string}) => 
                            company.logo_path ?
                        <img className="w-[100px] h-[100px] object-contain" src={`${baseUrl}${company.logo_path}`} alt="product company logo" key={company.id}/> : null)
                    }
                </div>
                <h3 className="uppercase"> {film?.production_companies.map((company: { id: number, name: string, logo_path: string}) => company.name).join(" • ") }</h3>
                {/* vote */}
                <div className="flex gap-2 w-full justify-center items-center">
                    <span className=" italic text-xl">Vote :</span>
                    {
                        Array.from({length: Math.floor(film?.vote_average ?? 0)}, (_, i) => i+1).map((vote) => 
                        <FaStar className="text-[#f5c518] hover:scale-125 hover:cursor-pointer" 
                        key={vote} />)
                    }
                    {
                        (film?.vote_average ?? 0) % 1 !== 0 ? <FaStarHalfStroke className="text-[#f5c518] hover:scale-125 hover:cursor-pointer" /> : null
                    }
                    <p>({(film?.vote_average ?? 0).toFixed(1)})</p>
                </div>

            </div>
        </div>
    )
}