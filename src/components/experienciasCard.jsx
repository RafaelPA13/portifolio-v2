import useInView from "../hooks/useInView";
import Skill from "./skill";

export default function ExperienciasCard({ experiencia }) {
    const { ref, inView } = useInView();
    return (
        <li ref={ref} className={`relative flex flex-col gap-2 pl-6 ${inView ? "animate-fade-in-left" : "opacity-0"}`}>
            <span className="absolute left-0 top-1 h-full flex flex-col items-center">
                <span className="w-3 h-3 rounded-full bg-amber-400 translate-x-0"/>
                <span className="flex-1 w-[2px] bg-amber-400"/>
            </span>
            <h5 className="font-semibold text-amber-400">{experiencia.data_inicio} - {experiencia.data_fim ? experiencia.data_fim : "Atual"}</h5>
            <h3 className="font-bold text-xl">{experiencia.cargo}</h3>
            <h4 className="font-medium text-lg text-indigo-950">{experiencia.empresa}</h4>
            <p className="text-base text-slate-500">{experiencia.descricao}</p>
            <ul className="flex flex-wrap gap-3">
                {experiencia.tecnologias.map((tecnologia, index) => (
                    <Skill key={index} skill={tecnologia} animated={false} inicio={false} card={true} />
                ))}
            </ul>
        </li>
    );
}