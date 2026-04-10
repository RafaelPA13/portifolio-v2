import Titulo from "../../components/titulo";
import Filtro from "../../components/filtro";
import CertificadoCard from "../../components/certificadoCard";

import { useState, useEffect } from "react";
import { getTecnologias } from "../../services/tecnologiasService";
import { getCertificados } from "../../services/certificadosService";

export default function Certificados() {
  const [skills, setSkills] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const certificadosFiltrados = filtroAtivo === "Todos" ? certificados : certificados.filter(certificado => certificado.tecnologias?.some(tech => tech.skill === filtroAtivo));

  async function carregarTecnologias() {
    const data = await getTecnologias();
    setSkills(data);
  }

  async function carregarCertificados() {
    const data = await getCertificados();
    setCertificados(data);
  }

  useEffect(() => {
    carregarTecnologias();
    carregarCertificados();
  }, []);

  return (
    <div className="client-page">
      <Titulo titulo="Certificados" subtitulo="Minha jornada de aprendizado contínuo"/>
      <Filtro
        options={skills}
        selectedOption={filtroAtivo}
        onSelect={setFiltroAtivo}
      />
      <ul className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificadosFiltrados.map((certificado, index) => (
          <CertificadoCard
            key={certificado.id}
            certificado={certificado}
            delay={index * 200}
          />
        ))}
      </ul>
    </div>
  );
}
