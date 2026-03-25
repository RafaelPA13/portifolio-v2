import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

import Fields from "../../components/fields";
import Buttons from "../../components/buttons"

export default function Contato() {
  return (
    <div className="py-32 bg-slate-100 min-h-screen flex flex-col items-center gap-10">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-3xl font-semibold mb-3">Contato</h1>
        <h2 className="text-lg text-slate-500 flex-wrap">
          Entre em contato e vamos conversar!
        </h2>
      </div>
      <div className="flex flex-wrap items-baseline justify-between w-[80%] gap-6 md:w-[60%] ">
        <div className="flex flex-col gap-6">
          <span className="flex items-baseline gap-2">
            <IoMailOutline className="text-2xl text-amber-400"/>
            <div className="">
              <p className="text-lg">E-mail</p>
              <p className="text-slate-500">rafaporann@gmail.com</p>
            </div>
          </span>
          <span className="flex items-baseline gap-2">
            <IoLocationOutline className="text-2xl text-amber-400"/>
            <div>
              <h4 className="text-lg">Localização</h4>
              <p className="text-slate-500">São Paulo, Brasil</p>
            </div>
          </span>
        </div>
        <form style={{animationDelay: "300ms", animationFillMode: "backwards"}} className="bg-slate-50 p-6 border-1 border-slate-300 rounded-xl grid gap-5 grid-cols-1 w-full animate-fade-in-up md:grid-cols-2 md:w-[60%]">
            <Fields className="md:col-span-1" type="text" placeholder="Seu Nome" />
            <Fields className="md:col-span-1" type="text" placeholder="Seu E-mail" />
            <Fields className="md:col-span-2" type="text" placeholder="Assunto" />
            <Fields className="md:col-span-2" type="text" placeholder="Sua Mensagem" textarea={true}/>
            <div>
                <Buttons text={"Enviar Mensagem"} icon={<FiSend/>} />
            </div>
        </form>
      </div>
    </div>
  );
}
