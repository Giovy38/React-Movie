import { useState, useMemo, useEffect, useCallback } from "react";
import SeriesCard from "../components/SeriesCard";
import SectionTitle from "../components/SectionTitle";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';


type seriesData = {
    page: number;
    results: seriesResponse[];
    total_pages: number;
    total_results: number
}

type seriesResponse = {
    adult: boolean;
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


export default function useSeriesFetch(url : string, sectionTitle: string) {

    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/'
    const [loading, setLoading] = useState(false)
    const [series, setSeries] = useState<seriesResponse[]>([])

    const updateFilms = useCallback(async () => {
        setLoading(true);
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWY4MzY4YmM5YTY3ZWE0MjZhNjc2NGY4MGRkN2NmZCIsIm5iZiI6MTcyNzcwNjcyMy4wMzg3NzUsInN1YiI6IjY2M2RmMGE0Yzk3YWIwMDQ1YzUxMjg5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yra5bSgyZu43keh2vIShwvwltallZ1vCF38G2Rv1abc'
            }
        };
        try {
            const res = await fetch(url , options);
            const data: seriesData = await res.json();
            const findedFilms: seriesResponse[] = data.results;
            setSeries(findedFilms);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }, [url]); 
    
    useEffect(() => {
        updateFilms();
    }, [updateFilms]); 

    
    
    const memoizedFilms = useMemo(() => {
        return series.map((serie) => (
            <SwiperSlide key={serie.id}>
                <SeriesCard id={serie.id} imgUrl={imgBaseUrl + serie.poster_path} title={serie.name} release_date={serie.first_air_date} />
            </SwiperSlide>
        ))
      }, [series]);

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
                            {memoizedFilms}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>
    );
}