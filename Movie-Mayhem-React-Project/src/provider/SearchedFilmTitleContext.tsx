import { createContext, useContext, useState, useCallback } from "react";
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
  search: (searchTitle: string) => Promise<void>;
  hasSearched: boolean;
  setHasSearched: (value: boolean) => void;
  isLoading: boolean;
}

// Create Context
const SearchContext = createContext<SearchContextType>({
  results: [],
  setResults: () => { },
  search: async () => { },
  hasSearched: false,
  setHasSearched: () => { },
  isLoading: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};


export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<Results[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (searchTitle: string) => {
    if (!searchTitle.trim()) {
      setHasSearched(false);
      setResults([]);
      return;
    }

    setHasSearched(true);
    setIsLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWY4MzY4YmM5YTY3ZWE0MjZhNjc2NGY4MGRkN2NmZCIsIm5iZiI6MTcyNzcwNjcyMy4wMzg3NzUsInN1YiI6IjY2M2RmMGE0Yzk3YWIwMDQ1YzUxMjg5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yra5bSgyZu43keh2vIShwvwltallZ1vCF38G2Rv1abc'
      }
    };

    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTitle}&include_adult=false&language=en-US&page=1`, options);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider value={{ results, setResults, search, hasSearched, setHasSearched, isLoading }}>
      {children}
    </SearchContext.Provider>
  );
};
