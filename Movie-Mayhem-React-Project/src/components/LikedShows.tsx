import { useLikedFilms } from "../provider/LikedFilmContext";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import ShowCard from "./ShowCard";
import { useMemo } from "react";

export default function LikedShowsList() {

    const { likedFilms } = useLikedFilms();

    // Calculate dynamically the number of slides per view based on the number of films available
    const slidesPerViewDynamic = likedFilms.length < 5.5 ? likedFilms.length : 5.5;

    const memoizedFilms = useMemo(() => {
        return likedFilms.map((film) => (
            <SwiperSlide key={film.id}>
                <ShowCard id={film.id} imgUrl={film.imgUrl} title={film.title} release_date={film.release_date} isFilm={true} />
            </SwiperSlide>
        ));
    }, [likedFilms]);

    return (
        <div className="text-white">
            <SectionTitle title="My Liked List" />
            {likedFilms.length > 0 ? (
                <Swiper
                    slidesPerView={slidesPerViewDynamic}
                    spaceBetween={50}
                    breakpoints={{
                        426: {
                            slidesPerView: likedFilms.length < 1.5 ? likedFilms.length : 1.5,
                        },
                        768: {
                            slidesPerView: likedFilms.length < 2.5 ? likedFilms.length : 2.5,
                        },
                        1226: {
                            slidesPerView: likedFilms.length < 3.5 ? likedFilms.length : 3.5,
                        },
                        1400: {
                            slidesPerView: likedFilms.length < 4.5 ? likedFilms.length : 4.5,
                        },
                        1800: {
                            slidesPerView: likedFilms.length < 5.5 ? likedFilms.length : 5.5,
                        },
                    }}
                    scrollbar={{ hide: true }}
                    grabCursor={true}
                    modules={[Scrollbar]}
                    className="mySwiper p-5"
                >
                    {memoizedFilms}
                </Swiper>
            ) : (
                <p className="italic text-xl font-semibold">
                    No liked films. Click on the Heart when you hover a card to add some!
                </p>
            )}
        </div>
    );
}
