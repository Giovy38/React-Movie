import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";

export default function PageBarNavigation() {

    const navigate = useNavigate();
    const location = useLocation();
    const activePage = location.pathname;

    const onHome = () => {
        navigate("/")
    }

    const onLikedFilm = () => {
        navigate("/liked-list");
    }

    const onTvSeries = () => {
        navigate("/tv-series");
    }


    return (
        <div className="bg-[#f5c518f6] flex justify-around text-black font-mono text-lg">

            <h3
                onClick={() => { onHome() }}
                onKeyDown={(e) => e.key === 'Enter' && onHome()}
                className={
                    `cursor-pointer hover:bg-[#a1882df6] hover:text-white w-full h-full p-2 
                    ${activePage === '/' ? 'bg-black text-white' : ''}`}>HomePage
            </h3>

            <h3
                onClick={() => { onLikedFilm() }}
                onKeyDown={(e) => e.key === 'Enter' && onLikedFilm()}
                className={
                    `cursor-pointer hover:bg-[#a1882df6] hover:text-white w-full h-full p-2 
                    ${activePage === '/liked-list' ? 'bg-black text-white' : ''}`}>Liked list</h3>

            <h3
                onClick={() => { onTvSeries() }}
                onKeyDown={(e) => e.key === 'Enter' && onTvSeries()}
                className={
                    `cursor-pointer hover:bg-[#a1882df6] hover:text-white w-full h-full p-2 
                    ${activePage === '/tv-series' ? 'bg-black text-white' : ''}`}>TV series
            </h3>
        </div>
    )
}