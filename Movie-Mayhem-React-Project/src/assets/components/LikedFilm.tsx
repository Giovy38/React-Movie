import { useLikedFilms } from "../provider/LikedFilmContext";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import FilmCard from "./FilmCard";
import { useMemo } from "react";


export default function LikedFilmsList() {

    const { likedFilms } = useLikedFilms(); 

    const memoizedFilms = useMemo(() => {
        return likedFilms.map((film) => (
            <SwiperSlide key={film.id}>
                <FilmCard id={film.id} imgUrl={film.imgUrl} title={film.title} release_date={film.release_date} />
            </SwiperSlide>
        ))
      }, [likedFilms]);

    return (
        <div className="text-white">
            <SectionTitle title="My Liked Films List" />
            {likedFilms.length > 0 ? (
                <Swiper
                slidesPerView={5.5}
                scrollbar={{hide: true}}
                grabCursor={true}
                modules={[Scrollbar]}
                className="mySwiper p-5"
            >
                {memoizedFilms}
            </Swiper>) : (
                <p className="italic text-xl font-semibold">No liked films. Click on the Heart when you pass  hover a card to add some!</p>
            )}
        </div>
    );
}
