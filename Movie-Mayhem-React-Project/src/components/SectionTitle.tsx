import Particles from "../../components/ui/particles"

export default function SectionTitle({ title }: { title: string }) {
    return (
        <div className="relative w-full h-[150px] flex justify-center items-center">
            {/* Particles come sfondo */}
            <Particles className="absolute top-0 left-0 w-full h-full" quantity={500} />

            {/* Titolo sopra le particelle */}


            <h2 className="uppercase font-mono font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-b from-black to-[#f5c518] mb-10">{title}</h2>

        </div>
    )
}





