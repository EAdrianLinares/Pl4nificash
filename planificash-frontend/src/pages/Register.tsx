import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);


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
        <div className="container mt-5  d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "500px" }}>
                <div className="text-center">
                    <h4>Pl4nifica$h </h4>
                    <h4> Registro</h4><br />
                </div>

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
                        <div className="input-group mb-3">
                            <input
                                type={showPasswords ? "text" : "password"}
                                className={`form-control ${password.length > 0 && password.length < 8 ? "is-invalid" : ""
                                    }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(!showPasswords)}
                                className="btn btn-outline-secondary"
                            >
                                {showPasswords ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Confirmar Contraseña</label>

                        <input
                            type={showPasswords ? "text" : "password"}
                            className={`form-control ${password.length > 0 && password.length < 8 ? "is-invalid" : ""
                                }`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />


                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-primary align">
                            Registrarse
                        </button>
                    </div>
                    <br />
                    <div className="text-center">
                        <p> Ya estás registrado?</p>
                        <a href="/">Inicia Sesión</a>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;