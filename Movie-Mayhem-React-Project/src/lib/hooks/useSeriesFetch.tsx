import useShowFetch from './useShowFetch';
import ShowCard from '../../components/ShowCard';
import SectionTitle from '../../components/SectionTitle';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { imgBaseUrl } from '../../config';


type SeriesResponse = {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export default function useSeriesFetch(url: string, sectionTitle: string) {

    const { items: series, loading } = useShowFetch<SeriesResponse & { title: string; release_date: string }>(url);

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
                            {series.map((serie) => (
                                <SwiperSlide key={serie.id}>
                                    <ShowCard
                                        id={serie.id}
                                        imgUrl={imgBaseUrl + serie.poster_path}
                                        title={serie.name}
                                        release_date={serie.first_air_date}
                                        isFilm={false}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
}