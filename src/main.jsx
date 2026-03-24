import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Páginas de cliente
import Inicio from "./pages/client/inicio";
import Projetos from "./pages/client/projetos";
import DetalhesProjeto from "./pages/client/detalhesProjeto";
import Certificados from "./pages/client/certificados";
import DetalhesCertificado from "./pages/client/detalhesCertificado";
import Contato from "./pages/client/contato";

// Páginas de admin
import Login from "./pages/admin/login";
import ProjetosAdmin from "./pages/admin/projetos";
import CertificadosAdmin from "./pages/admin/certificados";
import Curriculo from "./pages/admin/curriculo";
import Experiencias from "./pages/admin/experiencias";
import Conhecimentos from "./pages/admin/conhecimentos";

// Rotas
import ClientRoutes from "./routes/clientRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientRoutes />,
    children: [
      {index: true, element: <Inicio />},
      {path: "projetos", element: <Projetos />},
      {path: "projetos/:id", element:<DetalhesProjeto />},
      {path: "certificados", element: <Certificados />},
      {path: "certificados/:id", element: <DetalhesCertificado />},
      {path: "contato", element: <Contato />}
    ]
  },
  {
    path: "/admin/",
    element: <AdminRoutes />,
    children: [
      {index: true, element: <Login />},
      {path: "projetos", element: <ProjetosAdmin />},
      {path: "certificados", element: <CertificadosAdmin />},
      {path: "curriculo", element: <Curriculo />},
      {path: "experiencias", element: <Experiencias />},
      {path: "conhecimentos", element: <Conhecimentos />}
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);