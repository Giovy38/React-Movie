import ShowCard from './ShowCard';
import SectionTitle from './SectionTitle';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { imgBaseUrl } from '../config';

type Show = {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
};

type ShowListProps = {
    shows: Show[];
    loading: boolean;
    sectionTitle: string;
    isFilm: boolean;
};

export default function ShowList({ shows, loading, sectionTitle, isFilm }: ShowListProps) {
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
                            {shows.map((show) => (
                                <SwiperSlide key={show.id}>
                                    <ShowCard
                                        id={show.id}
                                        imgUrl={imgBaseUrl + show.poster_path}
                                        title={show.title}
                                        release_date={show.release_date}
                                        isFilm={isFilm}
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