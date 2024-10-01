import { useState, useMemo, useEffect, useCallback } from "react";
import FilmCard from "../components/FilmCard";
import SectionTitle from "../components/SectionTitle";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';


type filmData = {
    dates: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: filmResponse[];
    total_pages: number;
    total_results: number
}

type filmResponse = {
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


export default function useFilmFetch(url : string, sectionTitle: string) {

    const imgBaseUrl = 'https://image.tmdb.org/t/p/w500/'
    const [loading, setLoading] = useState(false)
    const [films, setFilm] = useState<filmResponse[]>([])

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
            const data: filmData = await res.json();
            const findedFilms: filmResponse[] = data.results;
            setFilm(findedFilms);
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
        return films.map((film) => (
            <SwiperSlide key={film.id}>
                <FilmCard imgUrl={imgBaseUrl + film.poster_path} title={film.title} release_date={film.release_date} />
            </SwiperSlide>
        ))
      }, [films]);

    return(
        <div className="w-[100vw] min-h-[60vh] flex gap-10 p-5 bg-black flex-col mb-10">

            <div>
            <SectionTitle title={sectionTitle} />
            <div className="flex flex-wrap gap-10 align-center justify-center">
            {loading ? <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin"/>: 
                <Swiper
                    slidesPerView={5.5}
                    scrollbar={{hide: true}}
                    grabCursor={true}
                    modules={[Scrollbar]}
                    className="mySwiper p-5"
                >
                    {memoizedFilms}
                </Swiper>
            
            }

            </div>
            </div>
        </div>
    )
}