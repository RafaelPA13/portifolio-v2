import { Link } from "react-router-dom"
import Skill from "./skill"

export default function ProjetosCard({ projeto, delay = 0 }) {
    return (
        <Link 
            to={""} 
            style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
            className="group rounded-lg bg-mist-50 overflow-hidden flex flex-col gap-3 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
        >
            <div className="w-full h-48 overflow-hidden bg-mist-200">
                <img className="w-full h-full object-cover" src={projeto.imagem || "/imagem-nao-encontrada.png"} alt={projeto.nome} />
            </div>
            <div className="bg-mist-50 p-5 flex flex-col gap-3">
                <h3 className="font-semibold text-indigo-950 transition-colors group-hover:text-amber-400">{projeto.nome}</h3>
                <p className="text-mist-500 text-sm">{projeto.resumo}</p>
                <ul className="flex items-center gap-2 flex-wrap">
                    {projeto.tecnologias.map((tecnologia) => (
                        <Skill key={tecnologia.id} skill={tecnologia.nome} inicio={false} card={true} animated={false} />
                    ))}
                </ul>
            </div>
        </Link>
    )
}