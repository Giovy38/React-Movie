import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";


// Tipo per i dati del film
interface FilmData {
    id: number;
    title: string;
    imgUrl: string;
    release_date: string;
}

// Context Type
interface LikedFilmsContextType {
    likedFilms: FilmData[];
    addFilm: (film: FilmData) => void;
    removeFilm: (id: number) => void;
}

// Context creation
const LikedFilmsContext = createContext<LikedFilmsContextType | undefined>(undefined);

// Context Provider 
export const LikedFilmsProvider = ({ children }: { children: ReactNode }) => {
    const [likedFilms, setLikedFilms] = useState<FilmData[]>([]);

    const addFilm = (film: FilmData) => {
        setLikedFilms((prevFilms) => [...prevFilms, film]);
    };

    const removeFilm = (id: number) => {
        setLikedFilms((prevFilms) => prevFilms.filter((film) => film.id !== id));
    };

    return (
        <LikedFilmsContext.Provider value={{ likedFilms, addFilm, removeFilm }}>
            {children}
        </LikedFilmsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLikedFilms = () => {
    const context = useContext(LikedFilmsContext);
    if (!context) {
        throw new Error("useLikedFilms deve essere usato dentro LikedFilmsProvider");
    }
    return context;
};