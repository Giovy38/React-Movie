import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Type for the film data
interface FilmData {
    isFilm: boolean;
    id: number;
    title: string;
    imgUrl: string;
    release_date: string;
}

// Type for the show data
type LikedShow = {
    id: number;
    title: string;
    imgUrl: string;
    release_date: string;
    isFilm: boolean;
};

// Context Type
interface LikedFilmsContextType {
    likedFilms: FilmData[];
    addFilm: (film: FilmData) => void;
    removeFilm: (id: number) => void;
}

// Context creation
const LikedFilmsContext = createContext<LikedFilmsContextType>({
    likedFilms: [],
    addFilm: () => { },
    removeFilm: () => { },
});

// Context Provider 
export const LikedFilmsProvider = ({ children }: { children: ReactNode }) => {
    const [likedFilms, setLikedFilms] = useState<FilmData[]>(() => {
        const saved = localStorage.getItem("likedFilms");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("likedFilms", JSON.stringify(likedFilms));
    }, [likedFilms]);

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
    return {
        ...context,
        addFilm: (show: LikedShow) => context.addFilm(show),
        removeFilm: (id: number) => context.removeFilm(id),
    };
};
