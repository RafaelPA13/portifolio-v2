import { LiaCertificateSolid } from "react-icons/lia";
import { FaRegClock } from "react-icons/fa";

import Skill from "./skill";

import { Link } from "react-router-dom";

export default function CertificadoCard({ certificado, delay = 0 }) {
  // Formata data de "YYYY-MM-DD" para "MM/YYYY"
  function formatarData(data) {
    if (!data) return null;
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const dt_conclusao = formatarData(certificado.dt_conclusao);

  return (
    <Link
      to={certificado.link}
      target="_blank"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
      className="group rounded-lg bg-slate-50 border border-slate-300 p-6 overflow-hidden flex flex-col gap-3 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up"
    >
      <span className="w-12 h-12 rounded-lg flex items-center justify-center bg-amber-100 text-2xl text-amber-400">
        <LiaCertificateSolid />
      </span>
      <h3 className="font-semibold transition-colors group-hover:text-amber-400">
        {certificado.nome}
      </h3>
      <h4 className="text-indigo-950">{certificado.instituicao}</h4>
      <span className="text-sm text-slate-500 flex items-center gap-2">
        <p>{dt_conclusao}</p>
        <p className="flex items-center gap-1">
          <FaRegClock /> {certificado.carga_horaria}h
        </p>
      </span>
      <ul className="flex items-center gap-2 flex-wrap">
        {certificado.tecnologias?.map((tech, index) => (
          <Skill
            key={index}
            skill={tech.skill}
            inicio={false}
            card={true}
            animated={false}
          />
        ))}
      </ul>
    </Link>
  );
}
