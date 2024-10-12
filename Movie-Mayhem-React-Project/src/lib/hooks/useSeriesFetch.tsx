import useShowFetch from './useShowFetch';

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

type SeriesType = 'airing_today' | 'on_the_air' | 'popular' | 'top_rated';

const buildSeriesUrl = (type: SeriesType): string => {
    const baseUrl = 'https://api.themoviedb.org/3/tv/';
    const postUrl = '?language=en-US&page=1';
    return `${baseUrl}/${type}${postUrl}`;
};

export default function useSeriesFetch(type: SeriesType) {
    const url = buildSeriesUrl(type);
    const { state } = useShowFetch<SeriesResponse>(url);

    return {
        series: state.status === 'results' ? state.results.map(serie => ({
            id: serie.id,
            poster_path: serie.poster_path,
            name: serie.name,
            first_air_date: serie.first_air_date
        })) : [],
        loading: state.status === 'loading'
    };
}
