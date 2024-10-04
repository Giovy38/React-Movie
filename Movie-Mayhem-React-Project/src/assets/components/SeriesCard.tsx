
import { useEffect, useState } from "react";
import { FaRegHeart,FaHeart  } from "react-icons/fa6";
import { useLikedFilms } from "../provider/LikedFilmContext";
import { useNotification } from "../provider/NotificationContext";
import { useNavigate } from "react-router-dom";


type SeriesCardProps = {
    id: number,
    imgUrl: string,
    title: string,
    release_date: string
}

export default function SeriesCard({ id, imgUrl, title, release_date }: SeriesCardProps) {

    const [liked, setLiked] = useState(false);
    const { likedFilms, addFilm, removeFilm } = useLikedFilms();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(()=>{
        const isLiked = likedFilms.some((film) => film.id === id);
        setLiked(isLiked);
    }, [likedFilms, id]);

    const toggleLike = ()=>{
        if(!liked){
            addFilm({id, title, imgUrl, release_date});
            showNotification(`${title} added to liked list!`, "success");
        } else {
            removeFilm(id);
            showNotification(`${title} removed from liked list!`, "error");
        }
        setLiked(!liked);
    }

    const serieDetails = () => {
        navigate(`/series/${id}`);
    }


    return (
        <div className="relative w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-lg shadow-[#f5c518]">
            {/* Image that is always visible */}
            <div className="absolute inset-0 z-10 cursor-grab">
                <img className="w-full h-full object-cover " src={imgUrl} alt="film-cover" />
            </div>

            {/* Content that shows on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col gap-4 p-3 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out z-20">
                <div className="w-full overflow-hidden min-h-[250px] rounded-3xl">
                    <img
                    onClick={()=> serieDetails() } 
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            serieDetails();
                        }
                      }} 
                     className="hover:scale-125 cursor-pointer transition-transform duration-300 ease-in-out" 
                     src={imgUrl} alt="film-cover" />
                </div>
                <h4 className="text-white flex justify-between items-center pr-5 pl-5">
                    <div>
                    {liked? 
                    <FaHeart onClick={() => toggleLike()} className="text-3xl cursor-pointer" /> :
                    <FaRegHeart onClick={() => toggleLike()} className="text-3xl cursor-pointer" />
                    }
                    </div>
                    <div>
                    <span className="text-[#f5c518] font-serif">Release Date: </span>
                    <span className="italic font-mono">{release_date}</span>
                    </div>
                   
                </h4>
                <div   
                onClick={()=> serieDetails() } 
                onKeyUp={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        serieDetails();
                    }
                  }} 
                className="bg-[#f5c5189a] text-white rounded-full p-1 min-h-[70px] flex justify-center items-center hover:bg-[#f5c518] hover:text-black hover:text-lg hover:cursor-pointer transition-colors duration-300 ease-in-out"
                
            >
                    <h3 
                    className="uppercase font-mono font-extrabold text-md hover:cursor-pointer">{title}</h3>
                </div>
                
            </div>
        </div>
    );
}
