import { useSearch } from "../provider/SearchedFilmTitleContext";
import FilmCard from "./FilmCard";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

export default function FilmSearchResult() {
  
    const { results } = useSearch();
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/'

    return (
        <div className="w-full flex gap-5 bg-black flex-col mb-10">
            <SectionTitle title="Search Results" />

            <div>
                {results.length > 0 ? (
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
                            1800:{
                                slidesPerView: 5.5 
                            }
                        }}
                        scrollbar={{ hide: true }}
                        grabCursor={true}
                        modules={[Scrollbar]}
                        className="mySwiper p-5"
                    >
                        {results.map((result) => (
                            <SwiperSlide key={result.id}>
                                <FilmCard
                                    id={result.id}
                                    imgUrl={result.poster_path === null
                                        ? 'https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg'
                                        : imgBaseUrl + result.poster_path}
                                    title={result.title}
                                    release_date={result.release_date}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <h3 className="font-thin text-white text-xl italic">
                        Search something with a valid title to show the results here...
                    </h3>
                )}
            </div>
        </div>
    );
}
