import Titulo from "../../components/titulo";
import Filtro from "../../components/filtro";
import ProjetosCard from "../../components/projetosCard";

import { useState, useEffect } from "react";
import { getTecnologias } from "../../services/tecnologiasService";
import { getProjetos } from "../../services/projtetosService";

export default function Projetos() {
  const [skills, setSkills] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const projetosFiltrados = filtroAtivo === "Todos" ? projetos : projetos.filter(projeto => projeto.tecnologias?.some(tech => tech.skill === filtroAtivo));

  async function carregarTecnologias() {
    const data = await getTecnologias();
    setSkills(data);
  }

  async function carregarProjetos() {
    const data = await getProjetos();
    setProjetos(data);
  }

  useEffect(() => {
    carregarTecnologias();
    carregarProjetos();
  }, []);

  return (
    <div className="client-page">
      <Titulo titulo="Projetos" subtitulo="Conheça alguns dos meus trabalhos"/>
      <Filtro options={skills} selectedOption={filtroAtivo} onSelect={setFiltroAtivo} />
      <ul className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetosFiltrados.map((projeto, index) => (
            <ProjetosCard key={projeto.id} projeto={projeto} delay={index * 100} />
        ))}
      </ul>
    </div>
  );
}
