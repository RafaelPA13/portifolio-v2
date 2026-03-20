import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

export default function ClientRoutes() {
  return (
    <>
      <Navbar />
      <h1>Cliente</h1>
      <Outlet/>
    </>
  );
}
