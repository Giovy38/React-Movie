import { FaHeart, FaRegHeart, FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

type searchType = {
    id: number;
    title?: string; //film have title but TV series have name
    overview: string;
    release_date?: string;
    runtime?: number; // TV series can haven't runtime
    vote_average: number;
    genres: { id: number, name: string }[];
    production_companies: { id: number, name: string, logo_path: string }[];
    // Series Tv attributes
    first_air_date?: string;
    number_of_seasons?: number;
    number_of_episodes?: number;
    last_episode_to_air?: {
        name: string;
        runtime: number;
    };
    status?: string;
    name?: string; // for tv series this is the title
}

export default function SingleShowDetails({
    img,
    isLiked,
    toggleLike,
    show
}: {
    img: string;
    isLiked: boolean;
    toggleLike: () => void;
    show: searchType;
}) {

    const baseUrl = 'https://image.tmdb.org/t/p/w500/'
    const isTVSeries = !!show.first_air_date; // Determina se è una serie TV

    return (
        <div className="min-h-[70vh] xl:min-h-[45vh] gap-5 p-10 flex justify-around flex-col lg:flex-row items-center">
            <div className="flex flex-col text-white gap-3 items-center ">
                {/* image */}
                <img className="w-[70%] rounded-xl" src={img} alt="film poster" />
                {/* liked? */}
                {isLiked ? (
                    <div className="bg-green-900 w-[70%] rounded-full p-2 font-extrabold text-sm font-mono ">
                        <h5>This film is in your liked list</h5>
                    </div>
                ) : null}
                {isLiked ? <FaHeart className="text-3xl md:text-4xl text-white hover:cursor-pointer" onClick={toggleLike} /> : <FaRegHeart className="text-3xl md:text-4xl text-white hover:cursor-pointer" onClick={toggleLike} />}
            </div>
            <div className="text-white flex flex-col gap-2 items-center text-center lg:text-left">
                {/* title and runtime or seasons/episodes */}
                <div className="flex flex-col gap-5 items-end xl:flex xl:flex-row xl:items-end">
                    {/* title */}
                    <h1 className="text-[40px] md:text-[50px] lg:text-[60px] font-bold uppercase font-mono text-balance text-[#f5c518]">
                        {isTVSeries ? show.name : show.title}
                    </h1>
                    {/* runtime or seasons/episodes */}
                    {isTVSeries ? (
                        <h4 className="text-lg md:text-xl">
                            (
                            {show.number_of_seasons} Seasons, {show.number_of_episodes} Episodes
                            )
                        </h4>
                    ) : (
                        <h4 className="text-lg md:text-xl">({show.runtime} minutes)</h4>
                    )}
                </div>
                {/* release date or first air date */}
                <p className="text-lg">
                    <span className="text-[#f5c518] italic text-lg md:text-xl">
                        {isTVSeries ? 'First Air Date:' : 'Released Date:'}
                    </span> {isTVSeries ? show.first_air_date : show.release_date}
                </p>
                {/* status for TV series */}
                {isTVSeries && show.status && (
                    <h3 className="uppercase font-extrabold text-md font-mono p-2 text-black rounded-full bg-[#f5c518]">{show.status}</h3>
                )}
                {/* last episode for TV series */}
                {isTVSeries && show.last_episode_to_air && (
                    <div className="bg-[#343434] p-5 rounded-2xl mt-5 mb-5 md:w-[80%] lg:w-[87%] xl:w-[65%]">
                        <p className="text-base md:text-lg text-balance text-center">
                            <span className="text-[#f5c518] italic text-lg md:text-xl">Last Episode: </span>
                            {show.last_episode_to_air.name} ({show.last_episode_to_air.runtime} minutes)
                        </p>
                    </div>
                )}
                {/* genres and production companies */}
                <div className="flex flex-col md:justify-around xl:w-full items-center gap-5 md:flex md:flex-row ">
                    {/* genres */}
                    <div className="p-5 rounded-2xl flex justify-center items-center flex-col text-center bg-slate-800">
                        <span className="text-[#f5c518] italic text-lg md:text-xl capitalize mb-3">Genres:</span>
                        <div className="flex flex-wrap items-start text-start gap-2">
                            {show.genres.map((genre) => (
                                <div key={genre.id} className="flex items-center bg-slate-600 rounded w-full justify-center">
                                    <h3 className="uppercase text-lg md:text-xl p-2 text-center">{genre.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* production companies */}
                    <div className="flex flex-col gap-2 justify-center items-center p-5 rounded-2xl ">
                        <span className="text-[#f5c518] italic text-lg md:text-xl capitalize">Production Companies:</span>
                        <div className="flex flex-wrap justify-center items-center gap-5 bg-slate-300 p-3 rounded-2xl">
                            {show.production_companies.map((company) =>
                                company.logo_path ? (
                                    <img className="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] object-contain" src={`${baseUrl}${company.logo_path}`} alt="product company logo" key={company.id} />
                                ) : null
                            )}
                        </div>
                    </div>
                </div>
                {/* description */}
                <div className="bg-[#343434] mt-5 p-5 rounded-2xl md:w-[80%] lg:w-[87%] xl:w-[65%]">
                    <p className="text-base md:text-lg text-balance text-center">
                        <span className="text-[#f5c518] italic text-lg md:text-xl">Description: </span> <br />{show.overview}
                    </p>
                </div>
                {/* vote */}
                <div className="flex gap-2 w-full justify-center items-center text-lg md:text-xl">
                    <span className="italic">Vote :</span>
                    {Array.from({ length: 10 }, (_, i) => {
                        const vote = show.vote_average ?? 0;
                        if (i < Math.floor(vote)) {
                            return <FaStar className="text-[#f5c518] hover:scale-125 hover:cursor-pointer" key={i} />;
                        } else if (i < Math.ceil(vote) && vote % 1 !== 0) {
                            return <FaStarHalfStroke className="text-[#f5c518] hover:scale-125 hover:cursor-pointer" key={i} />;
                        } else {
                            return <FaRegStar className="text-[#f5c518] hover:scale-125 hover:cursor-pointer" key={i} />;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}