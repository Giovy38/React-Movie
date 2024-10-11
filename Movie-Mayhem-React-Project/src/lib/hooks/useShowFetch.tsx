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

export default function useShowFetch<T>(url: string) {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<FetchData<T>>({
        results: undefined,
        page: 0,
        total_pages: 0,
        total_results: 0,
    });

    const updateItems = useCallback(async () => {
        setLoading(true);
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
            setItems({
                results: data.results,
                page: data.page,
                total_pages: data.total_pages,
                total_results: data.total_results,
            });
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setItems({
                results: [],
                page: 0,
                total_pages: 0,
                total_results: 0,
            });
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        updateItems();
    }, [updateItems]);

    return { items, loading };
}
