import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

import Titulo from "../../components/titulo";
import Fields from "../../components/fields";
import Buttons from "../../components/buttons";
import ToastNotification from "../../components/toastNotification";

import { useState } from "react";
import { enviarEmail } from "../../services/contatoService";

const FORM_VAZIO = {
  nome: "",
  email: "",
  assunto: "",
  mensagem: "",
};

export default function Contato() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);
  const [loading, setLoading] = useState(false);

  function setCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  // Toast
  function mostrarSucesso(msg) {
    setToast({ mensagem: msg, danger: false });
  }

  function mostrarErro(msg) {
    setToast({ mensagem: msg, danger: true });
  }

  // Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await enviarEmail({
        nome: form.nome,
        email: form.email,
        assunto: form.assunto,
        mensagem: form.mensagem,
      });
      mostrarSucesso("Mensagem enviada com sucesso!");
      setForm(FORM_VAZIO);
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao enviar mensagem.";
      mostrarErro(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="client-page">
      <Titulo
        titulo="Contato"
        subtitulo="Entre em contato e vamos conversar!"
      />
      <div className="flex flex-wrap items-baseline justify-between w-[80%] gap-6 md:w-[60%] ">
        <div className="flex flex-col gap-6">
          <span className="flex items-baseline gap-2">
            <IoMailOutline className="text-2xl text-amber-400" />
            <div className="">
              <p className="text-lg">E-mail</p>
              <p className="text-slate-500">rafaporann@gmail.com</p>
            </div>
          </span>
          <span className="flex items-baseline gap-2">
            <IoLocationOutline className="text-2xl text-amber-400" />
            <div>
              <h4 className="text-lg">Localização</h4>
              <p className="text-slate-500">São Paulo, Brasil</p>
            </div>
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          className="bg-slate-50 p-6 border border-slate-300 rounded-xl grid gap-5 grid-cols-1 w-full animate-fade-in-up md:grid-cols-2 md:w-[60%]"
        >
          <Fields
            className="md:col-span-1"
            type="text"
            placeholder="Seu Nome" value={form.nome} onChange={(e) => setCampo("nome", e.target.value)}
            required
          />
          <Fields
            className="md:col-span-1"
            type="text"
            placeholder="Seu E-mail" value={form.email} onChange={(e) => setCampo("email", e.target.value)}
            required
          />
          <Fields className="md:col-span-2" type="text" placeholder="Assunto" value={form.assunto} onChange={(e) => setCampo("assunto", e.target.value)} />
          <Fields
            className="md:col-span-2"
            type="text"
            placeholder="Sua Mensagem" value={form.mensagem} onChange={(e) => setCampo("mensagem", e.target.value)}
            textarea={true}
            required
          />
          <Buttons
            text={loading ? "Enviando..." : "Enviar Mensagem"}
            icon={<FiSend />}
            className={"col-span-1"}
            type={"submit"}
            disabled={loading}
          />
        </form>
      </div>
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
