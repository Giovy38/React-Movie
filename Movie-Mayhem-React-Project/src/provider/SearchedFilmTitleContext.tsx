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

type SearchState =
  | { status: 'idle'; results: undefined }
  | { status: 'searching'; results: undefined }
  | { status: 'noResults'; results: [] }
  | { status: 'results'; results: Results[] };

interface SearchContextType {
  state: SearchState;
  setResults: (results: Results[]) => void;
  search: (searchTitle: string) => Promise<void>;
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType>({
  state: { status: 'idle', results: undefined },
  setResults: () => { },
  search: async () => { },
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
  const [state, setState] = useState<SearchState>({ status: 'idle', results: undefined });
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (searchTitle: string) => {
    if (!searchTitle.trim()) {
      setState({ status: 'idle', results: undefined });
      return;
    }

    setState({ status: 'searching', results: undefined });
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
      if (data.results.length === 0) {
        setState({ status: 'noResults', results: [] });
      } else {
        setState({ status: 'results', results: data.results });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider value={{ state, setResults: (results) => setState({ status: 'results', results }), search, isLoading }}>
      {children}
    </SearchContext.Provider>
  );
};
