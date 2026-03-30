import { FaRegFileAlt } from "react-icons/fa";
import { RiUpload2Line } from "react-icons/ri";

import Titulo from "../../components/titulo";
import FileDrop from "../../components/filedrop";
import Buttons from "../../components/buttons";

export default function Curriculo() {
  return (
    <div className="w-[90%] md:w-[35%] flex flex-col gap-6">
      <Titulo titulo="Currículo" admin={true} button={false} />
      <form className="bg-slate-50 border border-mist-300 rounded-xl p-8 flex flex-col items-center gap-3">
        <span className="bg-amber-100 text-amber-400 p-4 rounded-xl">
          <FaRegFileAlt size={32} />
        </span>
        <p className="text-slate-500 text-center">
          Faça upload do seu currículo atualizado em formato PDF. Este arquivo
          ficará disponível para download na página principal.
        </p>
        <FileDrop accept="application/pdf" />
        <Buttons icon={<RiUpload2Line />} text="Fazer Upload" />
      </form>
    </div>
  );
}
