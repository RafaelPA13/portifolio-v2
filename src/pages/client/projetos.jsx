import Filtro from "../../components/filtro";
import ProjetosCard from "../../components/projetosCard";

import { useState } from "react";

export default function Projetos() {
  const skills = ["Python", "Java", "TypeScript", "JavaScript", "React", "Node.js", "Flask", "Spring Boot", "PostgreSQL", "MongoDB", "HTML/CSS", "Tailwind CSS", "IA"];
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const projetos = [
    {
      id: 1,
      nome: "Sistema de Gestão Empresarial",
      resumo: "Sistema completo para gestão de empresas com dashboard interativo.",
      imagem: null,
      tecnologias: [
        { id: 1, nome: "React" },
        { id: 2, nome: "TypeScript" },
        { id: 3, nome: "Node.js" },
        { id: 4, nome: "PostgreSQL" },
      ]
    },
    {
      id: 1,
      nome: "Sistema de Gestão Empresarial",
      resumo: "Sistema completo para gestão de empresas com dashboard interativo.",
      imagem: null,
      tecnologias: [
        { id: 1, nome: "React" },
        { id: 2, nome: "TypeScript" },
        { id: 3, nome: "Node.js" },
        { id: 4, nome: "PostgreSQL" },
      ]
    },
    {
      id: 1,
      nome: "Sistema de Gestão Empresarial",
      resumo: "Sistema completo para gestão de empresas com dashboard interativo.",
      imagem: null,
      tecnologias: [
        { id: 1, nome: "React" },
        { id: 2, nome: "TypeScript" },
        { id: 3, nome: "Node.js" },
        { id: 4, nome: "PostgreSQL" },
      ]
    },
  ];
  const projetosFiltrados = filtroAtivo === "Todos" ? projetos : projetos.filter(projeto => projeto.tecnologias.some(tech => tech.nome === filtroAtivo));

  return (
    <div className="py-32 bg-mist-100 min-h-screen flex flex-col items-center gap-10">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-3xl font-semibold mb-3">Projetos</h1>
        <h2 className="text-xl text-gray-600">
          Conheça alguns dos meus trabalhos
        </h2>
      </div>
      <Filtro options={skills} selectedOption={filtroAtivo} onSelect={setFiltroAtivo} />
      <ul className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetosFiltrados.map((projeto, index) => (
            <ProjetosCard key={projeto.id} projeto={projeto} delay={index * 100} />
        ))}
      </ul>
    </div>
  );
}
