import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";

export default function ProjetosAdmin() {
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
      <Titulo titulo="Projetos" admin={true} textoButton="Novo Projeto" />
      <DataTable columns={colunas} data={projetos} renderCell={renderCell}/>
    </div>
  );
}
