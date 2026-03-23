import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaRegFileAlt } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import { MdOutlineMenuBook } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ admin }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ANIMATION_DURATION = 400;

  const handleOpen = () => {
    setIsVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpenMenu(true));
    });
  };

  const handleClose = () => {
    setOpenMenu(false);
    setTimeout(() => setIsVisible(false), ANIMATION_DURATION);
  };

  const toggleMenu = () => {
    openMenu ? handleClose() : handleOpen();
  };

  const clientLinks = [
    { name: "Inicio", path: "/" },
    { name: "Projetos", path: "/projetos" },
    { name: "Certificados", path: "/certificados" },
    { name: "Contato", path: "/contato" },
  ];

  const adminLinks = [
    { icon: <FaRegFolderOpen />, name: "Projetos", path: "/admin/projetos" },
    { icon: <LiaCertificateSolid />, name: "Certificados", path: "/admin/certificados" },
    { icon: <FaRegFileAlt />, name: "Currículo", path: "/admin/curriculo" },
    { icon: <BsSuitcaseLg />, name: "Experiências", path: "/admin/experiencias" },
    { icon: <MdOutlineMenuBook />, name: "Conhecimentos", path: "/admin/conhecimentos" },
  ];

  const navLinks = admin ? adminLinks : clientLinks;

  return (
    <header className="bg-mist-50 z-50 fixed top-0 left-0 w-full shadow-md">
      <div className="h-16 flex items-center justify-between px-4">
        <span className="flex items-center gap-1 font-semibold text-lg">
          {admin && <LuLayoutDashboard className="text-amber-400" />}
          <p className={admin ? "text-indigo-950" : "text-amber-400"}>
            {admin ? "Admin" : "</RPA>"}
          </p>
        </span>
        <nav className={`hidden md:flex ${admin ? "w-[45%]" : "w-[25%]"} justify-between`}>
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              <span className="flex items-center gap-1 text-mist-500 hover:text-amber-400 transition-colors">
                {link.icon}
                {link.name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center">
          {admin ? (
            <button className="flex items-center gap-1 p-2 rounded-md transition hover:bg-amber-400 hover:text-red-800">
              <RxExit /> Sair
            </button>
          ) : (
            <ul className="flex gap-4 text-lg text-mist-500">
              <a className="hover:text-amber-400 transition-colors" href="https://github.com/RafaelPA13" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
              <a className="hover:text-amber-400 transition-colors" href="https://www.linkedin.com/in/rafael-porto-annunciato-751512265" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
              <a className="hover:text-amber-400 transition-colors" href="https://www.instagram.com/rafaportann__/" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
            </ul>
          )}
        </div>
        <button
          className="md:hidden text-2xl text-mist-500 hover:text-amber-400 transition-colors"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          {openMenu ? <IoCloseSharp /> : <IoMenuSharp />}
        </button>
      </div>
      {isVisible && (
        <div
          className={`md:hidden absolute top-16 left-0 w-full h-screen bg-mist-50 shadow-md z-50 flex flex-col px-4 gap-1 transition-all duration-[400ms] ease-in-out ${openMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path} onClick={handleClose}>
              <span
                className={`flex items-center gap-2 py-3 border-b border-mist-200 text-mist-500 hover:text-amber-400 transition-colors transition-all duration-[400ms] ease-in-out ${openMenu ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {link.icon}
                {link.name}
              </span>
            </Link>
          ))}
          {admin ? (
            <button
              className="flex items-center gap-2 mt-3 p-2 rounded-md transition hover:bg-amber-400 hover:text-red-800 w-fit"
              onClick={handleClose}
            >
              <RxExit /> Sair
            </button>
          ) : (
            <div className="flex gap-5 mt-3 text-xl text-mist-500">
              <a className="hover:text-amber-400 transition-colors" href="https://github.com/RafaelPA13" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
              <a className="hover:text-amber-400 transition-colors" href="https://www.linkedin.com/in/rafael-porto-annunciato-751512265" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
              <a className="hover:text-amber-400 transition-colors" href="https://www.instagram.com/rafaportann__/" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}