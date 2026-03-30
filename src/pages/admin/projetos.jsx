import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";
import ToastNotification from "../../components/toastNotification"
import Form from "../../components/form";

import { useState } from "react";

export default function ProjetosAdmin() {
  const [toast, setToast] = useState(null)
  const [formAberto, setFormAberto] = useState(false);

  function mostrarSucesso(msg) {
    setToast({ mensagem: msg, danger: false });
  }

  function mostrarErro(msg) {
    setToast({ mensagem: msg, danger: true });
  }

  const colunas = [
    { key: "nome", label: "Título", mobile: true },
    { key: "tecnologias", label: "Tecnologias", mobile: false },
    { key: "data", label: "Data", mobile: false },
  ];

  const projetos = [
    {
      id: 1,
      nome: "Sistema de Gestão Empresarial",
      tecnologias: [
        { id: 1, nome: "React" },
        { id: 2, nome: "TypeScript" },
        { id: 3, nome: "Node.js" },
      ],
      data: "2024-06-15",
    },
  ];

  const fields = [
    { type: "text", placeholder: "Título", className: "col-span-2" },
    { type: "text", placeholder: "Resumo", className: "col-span-2" },
    { type: "text", placeholder: "Descrição", textarea: true, className: "col-span-2" },
    { type: "text", placeholder: "Tecnologias", className: "col-span-2" },
    { type: "text", placeholder: "URL GitHub", className: "col-span-2" },
    { type: "text", placeholder: "URL Live", className: "col-span-2" },
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
      <Titulo titulo="Projetos" admin={true} textoButton="Novo Projeto" onClick={() => setFormAberto(true)} />
      <DataTable columns={colunas} data={projetos} renderCell={renderCell} onEdit={() => mostrarSucesso("Projeto Adicionado.")} onDelete={() => mostrarErro("Erro ao Deletar")}/>
      {toast && (
        <ToastNotification mensagem={toast.mensagem} danger={toast.danger} onClose={() => setToast(null)} />
      )}
      {formAberto && (
        <Form titulo="Novo Projeto" fields={fields} onClose={() => setFormAberto(false)} />
      )}
    </div>
  );
}
