import { useMemo } from "react";
import ShowCard from "../components/ShowCard";
import SectionTitle from "../components/SectionTitle";
import { useLikedFilms } from "../provider/LikedFilmContext";

export default function LikedPage() {
    const { likedFilms } = useLikedFilms();

    // Calculate number of slides per view based on the number of films available

    const memoizedFilms = useMemo(() => {
        return likedFilms.map((show) => (
            <ShowCard
                id={show.id}
                key={show.id}
                imgUrl={show.imgUrl}
                title={show.title}
                release_date={show.release_date}
                isFilm={show.isFilm}
            />
        ));
    }, [likedFilms]);

    return (
        <div className="text-white">
            <SectionTitle title="My Liked List" />
            <div className="flex flex-wrap gap-5 p-5 justify-around lg:min-h-[29vh]">
                {likedFilms.length > 0 ?

                    memoizedFilms
                    : (
                        <p className="italic text-xl font-semibold">
                            No element in your liked list. Click on the Heart when you hover a card to add some!
                        </p>
                    )}
            </div>

        </div>
    );
}