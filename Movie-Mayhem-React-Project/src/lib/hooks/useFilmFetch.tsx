import useShowFetch from './useShowFetch';
import FilmCard from '../../components/FilmCard';
import SectionTitle from '../../components/SectionTitle';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

type FilmResponse = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export default function useFilmFetch(url: string, sectionTitle: string) {
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
    const { items: films, loading } = useShowFetch<FilmResponse>(url);

    return (
        <div className="w-full min-h-[60vh] flex gap-10 p-5 bg-black flex-col mb-10">
            <div>
                <SectionTitle title={sectionTitle} />
                <div className="flex flex-wrap gap-10 align-center justify-center">
                    {loading ? (
                        <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
                    ) : (
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={50}
                            breakpoints={{
                                426: {
                                    slidesPerView: 1.5,
                                },
                                768: {
                                    slidesPerView: 2.5,
                                },
                                1226: {
                                    slidesPerView: 3.5,
                                },
                                1400: {
                                    slidesPerView: 4.5,
                                },
                                1800: {
                                    slidesPerView: 5.5,
                                }
                            }}
                            scrollbar={{ hide: true }}
                            grabCursor={true}
                            modules={[Scrollbar]}
                            className="mySwiper p-5"
                        >
                            {films.map((film) => (
                                <SwiperSlide key={film.id}>
                                    <FilmCard id={film.id} imgUrl={imgBaseUrl + film.poster_path} title={film.title} release_date={film.release_date} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
}