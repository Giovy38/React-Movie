import useShowFetch from './useShowFetch';
import ShowList from '../../components/ShowList';

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

const buildFilmUrl = (type: string): string => {
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
    const postUrl = '?language=en-US&page=1';
    return `${baseUrl}/${type}${postUrl}`;
};

export default function useFilmFetch(type: string, sectionTitle: string) {
    const url = buildFilmUrl(type);
    const { items: films, loading } = useShowFetch<FilmResponse>(url);

    return (
        <ShowList
            shows={films.map(film => ({
                id: film.id,
                poster_path: film.poster_path,
                title: film.title,
                release_date: film.release_date
            }))}
            loading={loading}
            sectionTitle={sectionTitle}
            isFilm={true}
        />
    );
}