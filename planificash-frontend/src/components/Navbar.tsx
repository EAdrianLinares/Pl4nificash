import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setMenuOpen(false);
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getSaludo = () => {
    const h = new Date().getHours();

    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <nav className="navbar-custom">

      {/* HEADER GLOBAL */}
      <div className="text-center py-2 navbar-greeting">
        <h6 className="mb-0">
          {getSaludo()}, {user.nombre || "Usuario"} 👋
        </h6>
      </div>

      <div className="navbar-mobile-trigger-wrap">
        <button
          type="button"
          className="navbar-mobile-trigger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú de navegación"
        >
          Menu
        </button>
      </div>

      {/* LINKS */}
      <div className={`navbar-links p-2 ${menuOpen ? "is-open" : ""}`}>

        <button onClick={() => goTo("/dashboard")} className="navbar-btn">
          Dashboard
        </button>

        <button onClick={() => goTo("/movimientos")} className="navbar-btn">
          Movimientos
        </button>

        <button onClick={() => goTo("/recurrentes")} className="navbar-btn">
          Recurrentes
        </button>

        <button onClick={logout} className="navbar-logout">
          Cerrar sesión
        </button>

      </div>

    </nav>
  );
};