import { useState, useRef } from "react";
import { useSearch } from "../provider/SearchedFilmTitleContext";
import { CgSearch } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
    const [title, setTitle] = useState('');
    const { search, setResults } = useSearch();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const location = useLocation();
    const isHomepage = location.pathname === '/';

    const resetInput = () => {
        setTitle('');
        setResults([]);
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
                    <div className="relative pr-2 flex items-center w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] bg-white rounded-full border border-gray-300">
                        <div className="text-white absolute bg-black rounded-full h-10 w-10 flex justify-center items-center hover:cursor-pointer">
                            <CgSearch onClick={handleSearch} />
                        </div>
                        <input
                            className="flex-grow h-10 text-center uppercase pr-10 pl-10 text-ellipsis overflow-hidden rounded-full border-none focus:outline-none"
                            value={title}
                            onChange={(e) => takeTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            type="text"
                            placeholder="Search a film by Title"
                        />
                        <div className="hover:cursor-pointer">
                            <RxCross1 className="text-xl font-bold" onClick={() => resetInput()} />
                        </div>
                    </div>
                </div>}
        </div>
    )
}