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
            localStorage.setItem("token", data.access_token);
            navigate("/dashboard")

        } catch (error) {
            console.error("Error en el Login", error);
        }
    };


    return (

        <div>
            <h1>Inicio de Sesión</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)} />

                <input type="password" placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;