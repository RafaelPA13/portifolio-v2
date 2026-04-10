import { IoArrowBack } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { TbExternalLink } from "react-icons/tb";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Skill from "../../components/skill";
import Links from "../../components/links";
import { getProjetoById } from "../../services/projtetosService";

export default function DetalhesProjeto() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarProjeto() {
      try {
        const data = await getProjetoById(id);
        setProjeto(data);
      } catch {
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    carregarProjeto();
  }, [id]);

  // Enquanto carrega
  if (loading) {
    return (
      <div className="py-32 bg-slate-100 min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Carregando...</p>
      </div>
    );
  }

  // Se deu erro ou não encontrou
  if (erro || !projeto) {
    return (
      <div className="py-32 bg-slate-100 min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Projeto não encontrado.</p>
      </div>
    );
  }

  // Só chega aqui quando projeto está carregado
  return (
    <div className="py-32 bg-slate-100 min-h-screen">
      <div className="flex flex-col gap-10 mx-auto w-[75%] md:w-[50%]">
        <Link
          to="/projetos"
          className="text-slate-500 flex items-center gap-2 transition-colors hover:text-amber-400"
        >
          <IoArrowBack />
          Voltar
        </Link>

        <div className="w-full h-64 overflow-hidden bg-slate-200 rounded-xl">
          <img
            className="w-full h-full object-cover"
            src={projeto.imagem || "/imagem-nao-encontrada.svg"}
            alt="Imagem não encontrada"
          />
        </div>

        <div className="w-full h-full flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{projeto.nome}</h2>
          <p className="text-slate-600">{projeto.descricao}</p>
        </div>

        <ul className="flex flex-wrap gap-3">
          {projeto.tecnologias?.map((tecnologia) => (
            <Skill
              key={tecnologia.id}
              skill={tecnologia.skill}
              animated={false}
              inicio={false}
              card={true}
            />
          ))}
        </ul>

        <span className="flex items-center flex-wrap gap-3">
          {projeto.repositorios?.map((repo, index) => (
            <Links
              key={index}
              text={`GitHub ${repo.tipo}`}
              to={repo.link}
              iconLeft={true}
              icon={<FiGithub />}
              blank={true}
            />
          ))}
          {projeto.link_projeto && (
            <Links
              text="Ver Projeto"
              to={projeto.link_projeto}
              iconLeft={true}
              icon={<TbExternalLink />}
              amarelo={true}
              blank={true}
            />
          )}
        </span>
      </div>
    </div>
  );
}
