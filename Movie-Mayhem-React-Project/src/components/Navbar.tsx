import { useNavigate } from "react-router-dom"

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <div className="bg-[#f5c518] w-[100vw] p-5 h-30 flex justify-center items-center gap-2 flex-col hover:cursor-pointer">
            <div 
            onClick={() => navigate("/")}
            onKeyDown={(e) => e.key === 'Enter' && navigate("/")}
            >
                <span className="text-4xl font-bold font-mono uppercase">Movie</span>
                <span className="text-4xl font-bold text-[#a88710] font-mono uppercase">Mayhem</span>
            </div>
        </div>
    )
}