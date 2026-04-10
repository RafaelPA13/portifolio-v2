import Navbar from "../components/navbar";
import { Outlet, Navigate } from "react-router-dom";
import { estaAutenticado } from "../services/authService";

export default function AdminRoutes() {
  if (!estaAutenticado()) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <Navbar admin={true} />
      <main className="py-28 bg-slate-100 min-h-screen flex flex-col items-center gap-10">
        <Outlet />
      </main>
    </>
  );
}
