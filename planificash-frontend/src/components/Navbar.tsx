import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
      <div className="text-center py-2">
        <h6 className="mb-0">
          {getSaludo()}, {user.nombre || "Usuario"} 👋
        </h6>
      </div>

      {/* LINKS */}
      <div className="navbar-links d-flex justify-content-center gap-3 p-2">

        
        <button onClick={() => navigate("/dashboard")} className="navbar-btn">
          Dashboard
        </button>

        <button onClick={() => navigate("/movimientos")} className="navbar-btn">
          Movimientos
        </button>

        <button onClick={logout} className="navbar-logout">
          Cerrar sesión
        </button>

      </div>

    </nav>
  );
};