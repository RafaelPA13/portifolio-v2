import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";

export default function Conhecimentos() {
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
  return (
    <div className="admin-page">
      <Titulo titulo="Tecnologias" admin={true} textoButton="Nova Tecnologia" />
      <DataTable columns={colunas} data={conhecimentos} />
    </div>
  );
}
