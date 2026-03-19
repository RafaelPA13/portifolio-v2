import { Outlet } from "react-router-dom";

export default function AdminRoutes() {
  return (
    <>
      <h1>Admin</h1>
      <Outlet />
    </>
  );
}
