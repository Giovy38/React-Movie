import { useState, useEffect, useCallback } from "react";
import 'swiper/css';
import 'swiper/css/scrollbar';


type FetchData<T> = {
    dates?: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: T[] | undefined;
    total_pages: number;
    total_results: number;
}


type FetchState<T> =
    | { status: 'idle'; results: undefined }
    | { status: 'loading'; results: undefined }
    | { status: 'noResults'; results: [] }
    | { status: 'results'; results: T[] };

export default function useShowFetch<T>(url: string) {
    const [state, setState] = useState<FetchState<T>>({ status: 'idle', results: undefined });

    const updateItems = useCallback(async () => {
        setState({ status: 'loading', results: undefined });
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWY4MzY4YmM5YTY3ZWE0MjZhNjc2NGY4MGRkN2NmZCIsIm5iZiI6MTcyNzcwNjcyMy4wMzg3NzUsInN1YiI6IjY2M2RmMGE0Yzk3YWIwMDQ1YzUxMjg5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yra5bSgyZu43keh2vIShwvwltallZ1vCF38G2Rv1abc'
            }
        };
        try {
            const res = await fetch(url, options);
            const data: FetchData<T> = await res.json();
            if (data.results && data.results.length > 0) {
                setState({ status: 'results', results: data.results });
            } else {
                setState({ status: 'noResults', results: [] });
            }
        } catch (err) {
            console.log(err);
            setState({ status: 'noResults', results: [] });
        }
    }, [url]);

    useEffect(() => {
        updateItems();
    }, [updateItems]);

    return { state };
}
