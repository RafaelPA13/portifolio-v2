import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Form from "../../components/form";

import { useState } from "react";

export default function Experiencias() {
  const [formAberto, setFormAberto] = useState(false);

  const colunas = [
    { key: "cargo", label: "Cargo", mobile: true },
    { key: "empresa", label: "Empresa", mobile: false },
    { key: "periodo", label: "Período", mobile: false },
  ];

  const experiencias = [
    {
      id: 1,
      cargo: "Desenvolvedor Full Stack Jr.",
      empresa: "Tech Solutions LTDA",
      periodo: "2024-01-15 — Atual",
    },
  ];

  const fields = [
    { type: "text", placeholder: "Cargo", className: "col-span-2" },
    { type: "text", placeholder: "Empresa", className: "col-span-2" },
    { type: "date", placeholder: "Data de Admissão", className: "col-span-1" },
    { type: "date", placeholder: "Data de Demissão", className: "col-span-1" },
    { type: "Text", placeholder: "Descrição", className: "col-span-2", textarea: true },
    { type: "text", placeholder: "Tecnologias", className: "col-span-2" },
  ];

    return (
        <div className="admin-page">
            <Titulo titulo="Experiências" admin={true} textoButton="Nova Experiência" onClick={() => setFormAberto(true)} />
            <DataTable columns={colunas} data={experiencias} />
            {formAberto && (
              <Form titulo="Nova Experiência" fields={fields} onClose={() => setFormAberto(false)} />
            )}
        </div>
    )
}