import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

export default function AdminRoutes() {
  return (
    <>
      <Navbar admin={true} />
      <main className="py-28 bg-slate-100 min-h-screen flex flex-col items-center gap-10">
        <Outlet />
      </main>
    </>
  );
}
