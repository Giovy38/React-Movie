import { useSearch } from "../../provider/SearchedFilmTitleContext";
import ShowCard from "../ShowCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { imgBaseUrl } from "../../config";

export default function FilmSearchResult() {
    const { state } = useSearch();

    switch (state.status) {
        case 'idle':
            return (
                <div>
                    <h3 className="font-thin text-white text-xl italic">
                        Search something with a valid title to show the results here...
                    </h3>
                </div>
            );
        case 'searching':
            return (
                <div className="w-full flex justify-center items-center">
                    <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
                </div>
            );
        case 'noResults':
            return (
                <h3 className="font-thin text-white text-xl italic">
                    No results for this title.
                </h3>
            );
        case 'results':
            return (
                <div>
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
                                slidesPerView: 5.5
                            }
                        }}
                        scrollbar={{ hide: true }}
                        grabCursor={true}
                        modules={[Scrollbar]}
                        className="mySwiper p-5"
                    >
                        {state.results.map((result) => (
                            <SwiperSlide key={result.id}>
                                <ShowCard
                                    id={result.id}
                                    imgUrl={result.poster_path === null
                                        ? 'https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg'
                                        : imgBaseUrl + result.poster_path}
                                    title={result.title}
                                    release_date={result.release_date}
                                    isFilm={true}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            );
    }
}
