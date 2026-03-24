import { IoArrowBack } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { TbExternalLink } from "react-icons/tb";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Skill from "../../components/skill";
import Links from "../../components/links";

export default function DetalhesProjeto() {
  const { id } = useParams();
  const projetos = [
    {
      id: 1,
      nome: "Sistema de Gestão Empresarial",
      resumo: "Sistema completo para gestão de empresas com dashboard interativo.",
      descricao: "Sistema completo para gestão de empresas com dashboard interativo, controle de estoque, finanças e relatórios. Desenvolvido com React no frontend e Node.js no backend.",
      imagem: null,
      tecnologias: [
        { id: 1, nome: "React" },
        { id: 2, nome: "TypeScript" },
        { id: 3, nome: "Node.js" },
        { id: 4, nome: "PostgreSQL" },
      ],
      repositorios: [
        { link: "https://github.com/...", tipo: "frontend" },
        { link: "https://github.com/...", tipo: "backend" },
      ],
      link_projeto: "https://...",
    },
    {
      id: 2,
      nome: "App de Delivery",
      resumo: "Aplicativo de delivery com rastreamento em tempo real.",
      descricao: "Aplicativo de delivery com rastreamento em tempo real, sistema de avaliações e integração com métodos de pagamento.",
      imagem: null,
      tecnologias: [
        { id: 1, nome: "React" },
        { id: 5, nome: "Python" },
        { id: 6, nome: "Flask" },
        { id: 7, nome: "MongoDB" },
      ],
      repositorios: [
        { link: "https://github.com/...", tipo: "frontend" },
        { link: "https://github.com/...", tipo: "backend" },
      ],
      link_projeto: null,
    },
    {
      id: 3,
      nome: "Chatbot com IA",
      resumo: "Chatbot inteligente usando processamento de linguagem natural.",
      descricao: "Chatbot inteligente usando processamento de linguagem natural para atendimento ao cliente automatizado.",
      imagem: null,
      tecnologias: [
        { id: 5, nome: "Python" },
        { id: 8, nome: "IA" },
        { id: 9, nome: "NLP" },
        { id: 10, nome: "FastAPI" },
      ],
      repositorios: [
        { link: "https://github.com/...", tipo: "único" },
      ],
      link_projeto: "https://...",
    },
  ];
  const projeto = projetos.find((p) => p.id === parseInt(id));

  return (
    <div className="py-32 bg-slate-100 min-h-screen">
      <div className="w-[50%] flex flex-col gap-10 mx-auto">
        <Link to="/projetos" className="text-slate-500 flex items-center gap-2">
          <IoArrowBack />
          Voltar
        </Link>
        <div className="w-full h-64 overflow-hidden bg-slate-200 rounded-xl">
          <img
            className="w-full h-full object-cover"
            src={projeto.imagem ||"/imagem-nao-encontrada.svg"}
            alt="Imagem não encontrada"
          />
        </div>
        <div className="w-full h-full flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{projeto.nome}</h2>
          <p className="text-slate-600">{projeto.descricao}</p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {projeto.tecnologias.map((tecnologia) => (
            <Skill key={tecnologia.id} skill={tecnologia.nome} animated={false} inicio={false} card={true}/>
          ))}
        </ul>
        <span className="flex items-center gap-3">
          {projeto.repositorios.map((repo, index) => (
            <Links key={index} text={`GitHub ${repo.tipo == "único" ? "" : repo.tipo}`} to={repo.link} iconLeft={true} icon={<FiGithub/>} blank={true}/>
          ))}
          {projeto.link_projeto && <Links text="Ver Projeto" to={projeto.link_projeto} iconLeft={true} icon={<TbExternalLink/>} amarelo={true} blank={true}/>}
        </span>
      </div>
    </div>
  );
}
