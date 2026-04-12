import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setError(""); // limpiar errores anteriores

        // 🔴 Validación campos vacíos
        if (!nombre || !email || !password || !confirmPassword) {
            setError("Todos los campos son obligatorios");
            return;
        }

        // 🔴 Validación contraseñas
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            await register(nombre, email, password);

            alert("Registro exitoso");
            navigate("/");

        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registro</h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Registrarse
                </button>
            </form>
        </div>
    );
}

export default Register;