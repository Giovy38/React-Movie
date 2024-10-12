import useShowFetch from './useShowFetch';


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
};

type FilmType = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

const buildFilmUrl = (type: FilmType): string => {
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const postUrl = '?language=en-US&page=1';
    return `${baseUrl}/${type}${postUrl}`;
};


export default function useFilmFetch(type: FilmType) {
    const url = buildFilmUrl(type);
    const { state } = useShowFetch<FilmResponse>(url);

    return {
        films: state.status === 'results' ? state.results.map(film => ({
            id: film.id,
            poster_path: film.poster_path,
            title: film.title,
            release_date: film.release_date
        })) : [],
        loading: state.status === 'loading'
    };
}