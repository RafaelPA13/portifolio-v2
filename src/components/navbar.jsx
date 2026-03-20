import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaRegFileAlt } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import { MdOutlineMenuBook } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { IoMenuSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

export default function Navbar({ admin }) {
    const clientLinks = [
        { name: "Inicio", path: "/" },
        { name: "Projetos", path: "/projetos" },
        { name: "Certificados", path: "/certificados" },
        { name: "Contato", path: "/contato" },
    ]

    const adminLinks = [
        { icon: <FaRegFolderOpen />, name: `Projetos`, path: "/admin/projetos" },
        { icon: <LiaCertificateSolid />, name: `Certificados`, path: "/admin/certificados" },
        { icon: <FaRegFileAlt />, name: `Currículo`, path: "/admin/curriculo" },
        { icon: <BsSuitcaseLg />, name: `Experiências`, path: "/admin/experiencias" },
        { icon: <MdOutlineMenuBook />, name: `Conhecimentos`, path: "/admin/conhecimentos" },
    ]

    const navLinks = admin ? adminLinks : clientLinks;

    return (
        <header className="bg-mist-50">
            <nav>
                {navLinks.map((link, index) => (
                    <Link key={index} to={link.path}>
                        <span className="flex items-center gap-1">{link.icon}{link.name}</span>
                    </Link>
                ))}
            </nav>
        </header>
    );
}