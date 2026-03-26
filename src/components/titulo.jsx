import Buttons from "./buttons";

import { IoMdAdd } from "react-icons/io";

export default function Titulo({ titulo, subtitulo, admin = false, button = true, textoButton, onClick }) {
  return (
    <>
      {admin ? (
        <span className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold mb-3">{titulo}</h1>
            {button ? <Buttons icon={<IoMdAdd/>} text={textoButton} onClick={onClick}/> : ""}
        </span>
      ) : (
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl font-semibold mb-3">{titulo}</h1>
          <h2 className="text-lg text-slate-500">{subtitulo}</h2>
        </div>
      )}
    </>
  );
}
