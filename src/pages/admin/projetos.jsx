import Titulo from "../../components/titulo";

export default function ProjetosAdmin() {
  return (
    <div className="admin-page">
      <Titulo titulo="Projetos" admin={true} textoButton="Novo Projeto" />
    </div>
  );
}
