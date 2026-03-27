import { FaCode } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";

import Titulo from "../../components/titulo";
import Fields from "../../components/fields";
import Buttons from "../../components/buttons";

export default function Login() {
  return (
    <div className="bg-slate-100 h-screen flex flex-col items-center justify-center gap-8">
      <span className="text-3xl text-slate-50 bg-indigo-950 p-4 rounded-xl animate-fade-in-up">
        <FaCode />
      </span>
      <Titulo titulo="Admin" subtitulo="Acesso Restrito"/>
      <form className="bg-slate-50 border border-slate-300 rounded-xl p-6 flex flex-col gap-4 animate-fade-in-up w-[75%] md:w-[25%]">
        <span className="flex flex-col gap-2">
          <label>E-mail</label>
          <Fields type="email" placeholder="admin@email.com" />
        </span>
        <span className="flex flex-col gap-2">
          <label>Senha</label>
          <Fields type="password" placeholder="admin123" />
        </span>
        <Buttons text="Entrar" icon={<GiPadlock />} />
      </form>
    </div>
  );
}
