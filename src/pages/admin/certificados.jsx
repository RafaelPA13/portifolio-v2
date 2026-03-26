import Titulo from "../../components/titulo";

export default function CertificadosAdmin() {
    return (
        <div className="admin-page">
            <Titulo titulo="Certificados" admin={true} textoButton="Novo Certificado" />
        </div>
    )
}