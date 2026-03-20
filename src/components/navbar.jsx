import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaRegFileAlt } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import { MdOutlineMenuBook } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { IoMenuSharp } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

import { Link } from "react-router-dom";

export default function Navbar({ admin }) {
  const clientLinks = [
    { name: "Inicio", path: "/" },
    { name: "Projetos", path: "/projetos" },
    { name: "Certificados", path: "/certificados" },
    { name: "Contato", path: "/contato" },
  ];

  const adminLinks = [
    { icon: <FaRegFolderOpen />, name: `Projetos`, path: "/admin/projetos" },
    {
      icon: <LiaCertificateSolid />,
      name: `Certificados`,
      path: "/admin/certificados",
    },
    { icon: <FaRegFileAlt />, name: `Currículo`, path: "/admin/curriculo" },
    {
      icon: <BsSuitcaseLg />,
      name: `Experiências`,
      path: "/admin/experiencias",
    },
    {
      icon: <MdOutlineMenuBook />,
      name: `Conhecimentos`,
      path: "/admin/conhecimentos",
    },
  ];

  const navLinks = admin ? adminLinks : clientLinks;

  return (
    <header className="h-16 bg-mist-50 flex items-center justify-between px-4 py-2 shadow-sm">
      <span className="flex items-center gap-1 font-semibold text-lg">
        {admin ? <LuLayoutDashboard className="text-amber-400" /> : null}
        <p className={`${admin ? "text-indigo-950" : "text-amber-400"}`}>
          {admin ? "Admin" : "</RPA>"}
        </p>
      </span>
      <nav className={`${admin ? "w-[45%]" : "w-[25%]"} flex justify-between`}>
        {navLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <span className="flex items-center gap-1 text-mist-500 hover:text-amber-400 transition-colors">
              {link.icon}
              {link.name}
            </span>
          </Link>
        ))}
      </nav>
      {admin ? (
        <button className="flex items-center gap-1 p-2 rounded-md transition hover:bg-amber-400 hover:text-red-800">
          <RxExit /> Sair
        </button>
      ) : (
        <ul className="w-[5%] flex justify-between text-lg text-mist-500">
          <a
            className="hover:text-amber-400 transition-colors"
            href="https://github.com/RafaelPA13"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub />
          </a>
          <a
            className="hover:text-amber-400 transition-colors"
            href="https://www.linkedin.com/in/rafael-porto-annunciato-751512265"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin />
          </a>
          <a
            className="hover:text-amber-400 transition-colors"
            href="https://www.instagram.com/rafaportann__/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiInstagram />
          </a>
        </ul>
      )}
    </header>
  );
}
