import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


type Results = {
  
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

// Context Type
interface SearchContextType {
  results: Results[];  
  setResults: (results: Results[]) => void;
}

// Create Context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// ?rovider
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<Results[]>([]);

  return (
    <SearchContext.Provider value={{ results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};
