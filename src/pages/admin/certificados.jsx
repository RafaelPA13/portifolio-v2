import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";
import Form from "../../components/form";

import { useState } from "react";

export default function CertificadosAdmin() {
  const [formAberto, setFormAberto] = useState(false);

  const colunas = [
    { key: "nome", label: "Título", mobile: true },
    { key: "instituicao", label: "Instituição", mobile: false },
    { key: "tecnologias", label: "Tecnologias", mobile: false },
  ];

  const certificados = [
    {
      id: 1,
      nome: "Python para Data Science",
      instituicao: "Alura",
      tecnologias: [{ id: 1, nome: "Python" }],
    },
  ];

  const fields = [
    { type: "text", placeholder: "Título", className: "col-span-2" },
    { type: "text", placeholder: "Instituição", className: "col-span-2" },
    { type: "date", placeholder: "Data de Conclusão", className: "col-span-2" },
    { type: "text", placeholder: "Tecnologias", className: "col-span-2" },
    { type: "text", placeholder: "URL Credencial", className: "col-span-2" },
  ];

  function renderCell(key, value, item) {
    if (key === "tecnologias") {
      return (
        <ul className="flex flex-wrap gap-1">
          {value.map((tech) => (
            <Skill key={tech.id} skill={tech.nome} animated={false} inicio={false} card={true} />
          ))}
        </ul>
      );
    }
    return value ?? "—";
  }

  return (
    <div className="admin-page">
      <Titulo titulo="Certificados" admin={true} textoButton="Novo Certificado" onClick={() => setFormAberto(true)} />
      <DataTable columns={colunas} data={certificados} renderCell={renderCell}/>
      {formAberto && (
        <Form titulo="Novo Certificado" fields={fields} onClose={() => setFormAberto(false)} />
      )}
    </div>
  );
}
