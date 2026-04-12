import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar-custom">
      <h2 className="navbar-logo">Pl4nifica$h</h2>

      <div className="navbar-links">
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