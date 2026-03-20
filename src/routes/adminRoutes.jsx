import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

export default function AdminRoutes() {
  return (
    <>
      <Navbar admin={true} />
      <h1>Admin</h1>
      <Outlet />
    </>
  );
}
