import { TiHome } from "react-icons/ti";
import { useNavigate } from "react-router-dom";


export default function ErrorPage(){

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/")
    }

    return(
        <div className="text-white min-h-[53vh] flex flex-col justify-center items-center gap-5">
            <h1 className="text-5xl font-mono uppercase text-red-700">Error 404 Page not found</h1>
            <div 
            onClick={()=>{goHome()}}
            onKeyDown={(e) => e.key === 'Enter' && goHome()}
            className="flex justify-center items-center gap-3 text-3xl cursor-pointer "
            >
                <TiHome className="text-[#f5c518]"/> 
                <h5 className="underline underline-offset-4">go home</h5>
            </div>
        </div>
    )
}