import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const data = await login(email, password);
            

            if (data.access_token) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/dashboard");
            } else {
                alert("Credenciales incorrectas");
            }

        } catch (error) {
            console.error("Error en el Login", error);
            alert("Error al iniciar sesión");
        }
    };


    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "350px" }}>

                <div className="text-center">
                    <h4>Pl4nifica$h </h4>
                    <h5> Inicio de Sesión</h5><br />
                </div>


                <form onSubmit={handleSubmit}>
                    <input className="form-control mb-2"
                        type="email" placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)} />

                    <input className="form-control mb-3"
                        type="password" placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <div className="text-center">
                        <button className="btn btn-primary" type="submit">
                            Ingresar</button>
                    </div>
                    <br />
                    <div className="text-center">
                        <p> ¿No tienes cuenta?
                            <a href="/register">Regístrate</a>
                        </p>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;