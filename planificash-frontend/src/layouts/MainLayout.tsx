import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="text-center app-title-wrap">
      <h1 className="app-title">Pl4nifica$h</h1>
      </div>

      {/* CONTENIDO */}
      <div className="app-content app-main">
        <Outlet />
      </div>

      <footer className="app-footer">
        Desarrollado por NegocioAlClic.com
      </footer>
    </div>
  );
};