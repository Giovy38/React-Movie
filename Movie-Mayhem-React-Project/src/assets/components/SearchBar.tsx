import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";


export default function SearchBar() {
    const [title, setTitle] = useState('');

   
    const search =  ()=>{
       console.log(title)
    }

    const resetInput = ()=>{
        setTitle('');
    }
    

    return (
        <div className="bg-[#f5c518] w-[100vw] p-2 pb-6 ">
            <div className="flex justify-center items-center">
            <div className="text-white bg-black rounded-3xl h-10 w-10 p-1 relative left-10 text-xl flex justify-center items-center hover:cursor-pointer">
            <CgSearch onClick={() => search()} />
            </div>
            <input className="rounded-full w-[20vw] h-10 text-center uppercase pr-10 text-ellipsis overflow-hidden" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            type="text" 
            placeholder="Search a film by Title" 
            />
            <div className="relative right-7 hover:cursor-pointer">
            <RxCross1 className="text-xl font-bold" onClick={() => resetInput()}/>
            </div>
            </div>
        </div>
    )
}