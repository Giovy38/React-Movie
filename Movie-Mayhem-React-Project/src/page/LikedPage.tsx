import { useMemo } from "react";
import FilmCard from "../components/FilmCard";
import SectionTitle from "../components/SectionTitle";
import { useLikedFilms } from "../provider/LikedFilmContext";

export default function LikedPage() {
    const { likedFilms } = useLikedFilms(); 

    // Calcola dinamicamente slidesPerView in base al numero di film disponibili

    const memoizedFilms = useMemo(() => {
        return likedFilms.map((film) => (
                <FilmCard id={film.id}  key={film.id} imgUrl={film.imgUrl} title={film.title} release_date={film.release_date} />
        ));
    }, [likedFilms]);

    return (
        <div className="text-white">
            <SectionTitle title="My Liked List" />
            <div className="flex flex-wrap gap-5 p-5 justify-around ">
            {likedFilms.length > 0 ? 
             
             memoizedFilms
      : (
         <p className="italic text-xl font-semibold">
             No element in your liked list. Click on the Heart when you hover a card to add some!
         </p>
     )}
            </div>
          
        </div>
    );
}