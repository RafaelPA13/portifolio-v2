import { useState } from "react";

import Titulo from "../../components/titulo";
import Filtro from "../../components/filtro";
import CertificadoCard from "../../components/certificadoCard";

export default function Certificados() {
  const skills = ["Python", "Java", "IA"];
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const certificados = [
    {
      id: 1,
      nome: "Python: Persistência de dados com arquivos, bancos de dados e APIs REST",
      instituicao: "Alura",
      tecnologia: "Python",
      data_conclusao: "02/02/2026",
      carga_horaria: 14,
      link: "https://cursos.alura.com.br/certificate/8ef69952-70e6-4c57-8e58-e014786659bd?lang=pt_BR",
      imagem: null,
    },
    {
      id: 2,
      nome: "ChatGPT e JavaScript: construa o jogo Pong",
      instituicao: "Alura",
      tecnologia: "IA",
      data_conclusao: "15/04/2024",
      carga_horaria: 8,
      link: "https://cursos.alura.com.br/certificate/0e937e3f-49d5-4f30-8400-d368aaa5d360?lang=pt_BR",
      imagem: null,
    },
    {
      id: 3,
      nome: "Java: aplicando a Orientação a Objetos",
      instituicao: "Alura",
      tecnologia: "Java",
      data_conclusao: "20/05/2024",
      carga_horaria: 10,
      link: "https://cursos.alura.com.br/certificate/9cfce790-8dc3-4fec-a635-0cc6a166f53b?lang=pt_BR",
      imagem: null,
    },
  ];
  const certificadosFiltrados =
    filtroAtivo === "Todos"
      ? certificados
      : certificados.filter(
          (certificado) => certificado.tecnologia === filtroAtivo,
        );

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
