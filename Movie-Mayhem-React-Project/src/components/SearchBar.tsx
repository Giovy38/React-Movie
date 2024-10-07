import { useState, useRef } from "react";
import { useSearch } from "../provider/SearchedFilmTitleContext";
import { CgSearch } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
    const [title, setTitle] = useState('');
    const { search, setResults, setHasSearched } = useSearch(); // Assicurati che setHasSearched sia disponibile
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const location = useLocation();
    const isHomepage = location.pathname === '/';

    const resetInput = () => {
        setTitle('');
        setResults([]);
        setHasSearched(false); // hasSearched false when input reset
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const takeTitle = (newTitle: string) => {
        setTitle(newTitle);
        handleKeyDown(newTitle);
    };

    const handleKeyDown = (newTitle: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            search(newTitle);
        }, 2000);
    };

    const handleSearch = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        search(title);
    };

    return (
        <div className="bg-[#f5c518] w-full p-2 pb-6">
            {isHomepage &&
                <div className="flex justify-center items-center">
                    <div className="text-white bg-black rounded-3xl h-10 w-10 p-1 relative left-2 sm:left-8 text-xl flex justify-center items-center hover:cursor-pointer">
                        <CgSearch onClick={handleSearch} />
                    </div>
                    <input
                        className="
                        rounded-full h-10 text-center uppercase pr-10 text-ellipsis overflow-hidden 
                        w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]"
                        value={title}
                        onChange={(e) => takeTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        type="text"
                        placeholder="Search a film by Title"
                    />
                    <div className="relative right-2 sm:right-7 hover:cursor-pointer">
                        <RxCross1 className="text-xl font-bold" onClick={() => resetInput()} />
                    </div>
                </div>}
        </div>
    )
}