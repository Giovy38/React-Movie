import useShowFetch from './useShowFetch';
import ShowList from '../../components/ShowList';

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

const buildSeriesUrl = (type: string): string => {
    const baseUrl = 'https://api.themoviedb.org/3/tv/';
    const postUrl = '?language=en-US&page=1';
    return `${baseUrl}/${type}${postUrl}`;
};

export default function useSeriesFetch(type: string, sectionTitle: string) {
    const url = buildSeriesUrl(type);
    const { items: series, loading } = useShowFetch<SeriesResponse>(url);

    return (
        <ShowList
            shows={series.map(serie => ({
                id: serie.id,
                poster_path: serie.poster_path,
                title: serie.name,
                release_date: serie.first_air_date
            }))}
            loading={loading}
            sectionTitle={sectionTitle}
            isFilm={false}
        />
    );
}