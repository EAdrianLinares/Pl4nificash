import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="text-center">
      <h1>Pl4nifica$h</h1>
      </div>

      {/* CONTENIDO */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};