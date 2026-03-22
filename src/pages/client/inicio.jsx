import { FaRegDotCircle } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";

import Buttons from "../../components/buttons";
import Links from "../../components/links";

export default function Inicio() {
  return (
    <>
      <section className="px-6 md:px-10 min-h-screen bg-mist-200 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 pt-24 pb-10 md:pt-0 md:pb-0">
        <div className="w-full md:w-[75%] flex flex-col gap-4 text-left">
          <h5 className="flex items-center gap-2 font-semibold text-amber-400">
            <FaRegDotCircle /> OLÁ, EU SOU
          </h5>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
            Rafael Porto Annunciato
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-indigo-950">
            Engenheiro de Software
          </h2>
          <p className="text-base md:text-xl text-mist-500">
            Sou um desenvolvedor apaixonado por tecnologia e inovação. Com
            experiência em desenvolvimento full stack, busco criar soluções
            elegantes e eficientes para problemas complexos. Estou sempre em
            busca de novos desafios e oportunidades de aprendizado.
          </p>
          <span className="flex items-center gap-4">
            <Buttons text="Baixar Currículo" icon={<MdOutlineFileDownload />} />
            <Links text="Ver Projetos" icon={<IoIosArrowRoundForward />} to="/projetos" />
          </span>
        </div>
        <div className="w-full flex justify-center">
          <img
            src="/Rafael.jpeg"
            alt="Rafael Porto Annunciato"
            className="size-48 sm:size-64 md:size-96 rounded-full border-8 border-amber-400"
          />
        </div>
      </section>
    </>
  );
}