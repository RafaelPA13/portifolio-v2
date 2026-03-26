import Titulo from "../../components/titulo";

export default function Conhecimentos() {
    return (
        <div className="admin-page">
            <Titulo titulo="Conhecimentos" admin={true} textoButton="Novo Conhecimento" />
        </div>
    )
}