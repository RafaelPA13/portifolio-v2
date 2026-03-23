import useInView from "../hooks/useInView";
import Skill from "./skill";

export default function ExperienciasCard() {
    const { ref, inView } = useInView();
    return (
        <li ref={ref} className={`relative flex flex-col gap-2 pl-6 ${inView ? "animate-fade-in-left" : "opacity-0"}`}>
            <span className="absolute left-0 top-1 h-full flex flex-col items-center">
                <span className="w-3 h-3 rounded-full bg-amber-400 translate-x-0"/>
                <span className="flex-1 w-[2px] bg-amber-400"/>
            </span>
            <h5 className="font-semibold text-amber-400">2024-01-15 - Atual</h5>
            <h3 className="font-bold text-xl">Desenvolvedor Full Stack</h3>
            <h4 className="font-medium text-lg text-indigo-950">Tech Solutions LTDA</h4>
            <p className="text-base text-mist-500">Desenvolvimento de aplicações web utilizando React e Node.js. Participação ativa em projetos de clientes e implementação de novas funcionalidades.</p>
            <ul className="flex items-center gap-3">
                <Skill skill={"React"} animated={false} inicio={false} card={true} />
                <Skill skill={"Node.js"} animated={false} inicio={false} card={true} />
                <Skill skill={"TypeScript"} animated={false} inicio={false} card={true} />
                <Skill skill={"PostgreSQL"} animated={false} inicio={false} card={true} />
            </ul>
        </li>
    );
}