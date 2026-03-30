import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Form from "../../components/form";

import { useState } from "react";

export default function Conhecimentos() {
  const [formAberto, setFormAberto] = useState(false);

  const colunas = [
    { key: "id", label: "ID", mobile: false },
    { key: "nome", label: "Skill", mobile: true },
    { key: "data_criacao", label: "Data Criação", mobile: false },
    { key: "data_atualizacao", label: "Data Atualização", mobile: false },
  ];

  const conhecimentos = [
    {
      id: 1,
      nome: "Python",
      data_criacao: "2024-01-15",
      data_atualizacao: "2024-01-15",
    },
  ];

  const fields = [
    { type: "text", placeholder: "Tecnologia", className: "col-span-2" },
  ];

  return (
    <div className="admin-page">
      <Titulo titulo="Tecnologias" admin={true} textoButton="Nova Tecnologia" onClick={() => setFormAberto(true)} />
      <DataTable columns={colunas} data={conhecimentos} />
      {formAberto && (
        <Form titulo="Nova Tecnologia" fields={fields} onClose={() => setFormAberto(false)} />
      )}
    </div>
  );
}
