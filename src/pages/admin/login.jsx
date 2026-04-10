import { FaCode } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";

import Titulo from "../../components/titulo";
import Fields from "../../components/fields";
import Buttons from "../../components/buttons";
import ToastNotification from "../../components/toastNotification"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, salvarToken } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null)
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setToast(null);

    if (!email || !senha) {
      setToast({ mensagem: "Preencha todos os campos", danger: true });
      return;
    }

    setLoading(true);
    try{
      const data = await login(email, senha);
      salvarToken(data.access_token);
      navigate("/admin/projetos");
    }
    catch(erro){
      if(erro.response?.status === 401){
        setToast({ mensagem: "E-mail ou senha incorretos", danger: true });
      }
      else{
        setToast({ mensagem: "Erro ao conectar com o servidor.", danger: true });
      }
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-100 h-screen flex flex-col items-center justify-center gap-8">
      <span className="text-3xl text-slate-50 bg-indigo-950 p-4 rounded-xl animate-fade-in-up">
        <FaCode />
      </span>
      <Titulo titulo="Admin" subtitulo="Acesso Restrito"/>
      <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-300 rounded-xl p-6 flex flex-col gap-4 animate-fade-in-up w-[75%] md:w-[25%]">
        <span className="flex flex-col gap-2">
          <label>E-mail</label>
          <Fields type="email" placeholder="admin@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </span>
        <span className="flex flex-col gap-2">
          <label>Senha</label>
          <Fields type="password" placeholder="admin123" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </span>
        <Buttons text={loading ? "Entrando..." : "Entrar"} icon={<GiPadlock />} type="submit" disabled={loading} />
      </form>
      {toast && (
        <ToastNotification mensagem={toast.mensagem} danger={toast.danger} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
