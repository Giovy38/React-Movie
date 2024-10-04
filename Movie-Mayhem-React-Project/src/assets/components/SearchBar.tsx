import { useState, useRef } from "react";
import { useSearch } from "../provider/SearchedFilmTitleContext";
import { CgSearch } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

type FilmData = {
    page: number;
    results: Results[];
  }
  
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
  };

export default function SearchBar() {
    const [title, setTitle] = useState('');
    const {setResults} = useSearch();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const location = useLocation();
    const isHomepage = location.pathname === '/';

   
    const search = async (searchTitle: string)=>{
       if (!title) return;
       if (title.trim() === '') return;

       const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWY4MzY4YmM5YTY3ZWE0MjZhNjc2NGY4MGRkN2NmZCIsIm5iZiI6MTcyNzcwNjcyMy4wMzg3NzUsInN1YiI6IjY2M2RmMGE0Yzk3YWIwMDQ1YzUxMjg5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yra5bSgyZu43keh2vIShwvwltallZ1vCF38G2Rv1abc'
        }
      };

      
       try{
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTitle}&include_adult=false&language=en-US&page=1`, options)
        const data: FilmData = await res.json()
        setResults(data.results)
        console.log(res)
       } catch(error){
        console.log(error)
       }
    }

    const resetInput = ()=>{
        setTitle('');
        setResults([]);
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
    }

    const takeTitle = (newTitle: string)=>{
        setTitle(newTitle)
        handleKeyDown(newTitle)
    }


    const handleKeyDown = (newTitle: string)=>{
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            search(newTitle)
        }, 2000);
    }
    
    
    return (
        <div className="bg-[#f5c518] w-full p-2 pb-6">
            {isHomepage &&
            <div className="flex justify-center items-center">
                <div className="text-white bg-black rounded-3xl h-10 w-10 p-1 relative left-2 sm:left-8 text-xl flex justify-center items-center hover:cursor-pointer">
                    <CgSearch onClick={() => search(title)} />
                </div>
                <input 
                    className="
                        rounded-full h-10 text-center uppercase pr-10 text-ellipsis overflow-hidden 
                        w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]" 
                    value={title} 
                    onChange={(e) => takeTitle(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && search(title)}
                    type="text" 
                    placeholder="Search a film by Title" 
                />
                <div className="relative right-2 sm:right-7 hover:cursor-pointer">
                    <RxCross1 className="text-xl font-bold" onClick={() => resetInput()}/>
                </div>
            </div>}
        </div>
    )
}