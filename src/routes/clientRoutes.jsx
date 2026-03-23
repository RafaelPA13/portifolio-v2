import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

export default function ClientRoutes() {
  return (
    <>
      <Navbar />
      <main className="font-mono">
        <Outlet/>
      </main>
    </>
  );
}
