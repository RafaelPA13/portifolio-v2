import { FaRegDotCircle } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";

import Buttons from "../../components/buttons";
import Links from "../../components/links";
import Skill from "../../components/skill";
import ExperienciasCard from "../../components/experienciasCard";

import { useEffect, useState } from "react";
import useInView from "../../hooks/useInView";
import { downloadCurriculo } from "../../services/curriculoService";
import { getTecnologias } from "../../services/tecnologiasService";
import { getExperiencias } from "../../services/experienciasService";

export default function Inicio() {
  const [skills, setSkills] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const { ref: refConhecimentos, inView: inViewConhecimentos } = useInView();
  const { ref: refExperiencias, inView: inViewExperiencias } = useInView();

  async function handleDownloadCurriculo() {
    const url =
      "https://portifolio-v2-api-production.up.railway.app/curriculo/download";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Rafael_Porto_Annunciato_Curriculo.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function carregarTecnologias() {
    const data = await getTecnologias();
    setSkills(data);
  }

  async function carregarExperiencias() {
    const data = await getExperiencias();
    setExperiencias(data);
  }

  useEffect(() => {
    carregarTecnologias();
    carregarExperiencias();
  }, []);

  return (
    <>
      <section className="px-6 md:px-10 min-h-screen bg-slate-100 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 pt-24 pb-10 md:pt-0 md:pb-0">
        <div className="w-full md:w-[75%] flex flex-col gap-4 text-left animate-fade-in-left">
          <h5 className="flex items-center gap-2 font-semibold text-amber-400">
            <FaRegDotCircle /> OLÁ, EU SOU
          </h5>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
            Rafael Porto Annunciato
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-indigo-950">
            Engenheiro de Software
          </h2>
          <p className="text-base md:text-xl text-slate-500">
            Sou um desenvolvedor apaixonado por tecnologia e inovação. Com
            experiência em desenvolvimento full stack, busco criar soluções
            elegantes e eficientes para problemas complexos. Estou sempre em
            busca de novos desafios e oportunidades de aprendizado.
          </p>
          <span className="flex items-center gap-4">
            <Buttons
              text="Baixar Currículo"
              icon={<MdOutlineFileDownload />}
              onClick={handleDownloadCurriculo}
            />
            <Links
              text="Ver Projetos"
              icon={<IoIosArrowRoundForward />}
              to="/projetos"
            />
          </span>
        </div>
        <div className="w-full flex justify-center animate-zoom-in">
          <img
            src="/Rafael.jpeg"
            alt="Rafael Porto Annunciato"
            className="size-48 sm:size-64 md:size-96 w-full h-full object-cover rounded-full border-4 border-amber-400"
          />
        </div>
      </section>
      <section className="bg-slate-50 flex flex-col items-center justify-center gap-10 py-16">
        <h2
          ref={refConhecimentos}
          style={{ animationFillMode: "backwards" }}
          className={`text-3xl font-semibold ${inViewConhecimentos ? "animate-fade-in-up" : "opacity-0"}`}
        >
          Conhecimentos
        </h2>
        <ul className="w-[75%] flex justify-center flex-wrap gap-4 md:w-[50%]">
          {skills.map((skill, index) => (
            <Skill key={skill.id} skill={skill.skill} delay={index * 50} />
          ))}
        </ul>
      </section>
      <section className="bg-slate-100 flex flex-col items-center justify-center gap-10 py-16">
        <h2
          ref={refExperiencias}
          style={{ animationFillMode: "backwards" }}
          className={`text-3xl font-semibold ${inViewExperiencias ? "animate-fade-in-up" : "opacity-0"}`}
        >
          Experiências
        </h2>
        <ul className="flex flex-col gap-8 w-[75%] md:w-[50%]">
          {experiencias.map((experiencia, index) => (
            <ExperienciasCard key={index} experiencia={experiencia} />
          ))}
        </ul>
      </section>
    </>
  );
}
