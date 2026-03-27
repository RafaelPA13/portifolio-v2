import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";

export default function Experiencias() {
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

    return (
        <div className="admin-page">
            <Titulo titulo="Experiências" admin={true} textoButton="Nova Experiência" />
            <DataTable columns={colunas} data={experiencias} />
        </div>
    )
}