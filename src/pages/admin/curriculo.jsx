import { FaRegFileAlt } from "react-icons/fa";
import { RiUpload2Line } from "react-icons/ri";

import Titulo from "../../components/titulo";
import FileDrop from "../../components/filedrop";
import Buttons from "../../components/buttons";
import ToastNotification from "../../components/toastNotification";

import { useState } from "react";
import { uploadCurriculo } from "../../services/curriculoService";

export default function Curriculo() {
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  function mostrarSucesso(msg) {
    setToast({ mensagem: msg, danger: false });
  }

  function mostrarErro(msg) {
    setToast({ mensagem: msg, danger: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!arquivo) {
      mostrarErro("Selecione um arquivo PDF antes de fazer o upload.");
      return;
    }

    setLoading(true);
    try {
      await uploadCurriculo(arquivo);
      mostrarSucesso("Currículo Atualizado");
      setArquivo(null);
    } catch (err) {
      const msg =
        err.response?.data?.detail ?? "Erro ao fazer upload do currículo.";
      mostrarErro(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[90%] md:w-[35%] flex flex-col gap-6">
      <Titulo titulo="Currículo" admin={true} button={false} />

      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 border border-mist-300 rounded-xl p-8 flex flex-col items-center gap-3"
      >
        <span className="bg-amber-100 text-amber-400 p-4 rounded-xl">
          <FaRegFileAlt size={32} />
        </span>
        <p className="text-slate-500 text-center">
          Faça upload do seu currículo atualizado em formato PDF. Este arquivo
          ficará disponível para download na página principal.
        </p>
        <FileDrop
          accept="application/pdf"
          onChange={(file) => setArquivo(file)}
        />
        <Buttons
          icon={<RiUpload2Line />}
          text={loading ? "Enviando..." : "Fazer Upload"}
          type="submit"
          disabled={loading || !arquivo}
        />
      </form>
      {toast && (
        <ToastNotification
          mensagem={toast.mensagem}
          danger={toast.danger}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
