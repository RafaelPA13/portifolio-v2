import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";

export default function CertificadosAdmin() {
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
      <Titulo titulo="Certificados" admin={true} textoButton="Novo Certificado" />
      <DataTable columns={colunas} data={certificados} renderCell={renderCell}/>
    </div>
  );
}
