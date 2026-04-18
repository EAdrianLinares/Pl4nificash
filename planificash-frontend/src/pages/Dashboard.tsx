import { useState } from "react";
import { crearMovimiento } from "../api/movimientos";
import { createRecurrente } from "../api/recurrentes";

import { MovimientoList } from "../components/MovimientoList";
import { DisponibleCard } from "../components/DisponibleCard";
import { ModalMovimiento } from "../components/ModalMovimiento";

import { useMovimientos } from "../hooks/useMovimientos";

import type {
    TipoMovimientoType,
    CategoriaMovimientoType,
} from "../types/movimiento";

function Dashboard() {
    const {
        ultimos5,
        disponible,
        loading,
        cargarMovimientos,
    } = useMovimientos();

    // =========================
    // MODAL
    // =========================
    const [mostrarModal, setMostrarModal] = useState(false);

    // =========================
    // FORMULARIO
    // =========================
    const [tipo, setTipo] = useState<string>("Ingreso");
    const [categoria, setCategoria] = useState<string>("Variable");
    const [descripcion, setDescripcion] = useState("");
    const [valor, setValor] = useState("");
    const [fecha, setFecha] = useState("");

    // =========================
    // HELPERS
    // =========================
    const resetForm = () => {
        setTipo("Ingreso");
        setCategoria("Variable");
        setDescripcion("");
        setValor("");
        setFecha("");
    };

    const cerrarYRecargar = async () => {
        setMostrarModal(false);
        resetForm();
        await cargarMovimientos();
    };

    // =========================
    // CREAR MOVIMIENTO NORMAL
    // =========================
    const handleMovimiento = async () => {
        try {
            await crearMovimiento({
                tipo: tipo as TipoMovimientoType,
                categoria: categoria as CategoriaMovimientoType,
                descripcion,
                valor: Number(valor),
                fecha,
            });

            await cerrarYRecargar();
        } catch (error) {
            console.log("Error movimiento:", error);
        }
    };

    // =========================
    // CREAR RECURRENTE
    // =========================
    const handleRecurrente = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            await createRecurrente({
                tipo: tipo as TipoMovimientoType,
                nombre: descripcion,
                monto: Number(valor),
                usuario_id: user.id,
            });

            await cerrarYRecargar();
        } catch (error) {
            console.log("Error recurrente:", error);
        }
    };

    // =========================
    // UI
    // =========================
    if (loading) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">

                    <div className="text-center mb-4">
                        <h2>Dashboard</h2>

                        {/* 💰 Disponible */}
                        <DisponibleCard disponible={disponible} />

                        {/* 📋 Últimos movimientos */}
                        <MovimientoList movimientos={ultimos5} />

                        {/* ➕ Botón */}
                        <div className="text-center mt-3">
                            <button
                                className="btn btn-success mb-3"
                                onClick={() => {
                                    resetForm(); // 🔥 siempre limpio
                                    setMostrarModal(true);
                                }}
                            >
                                Agregar Movimiento
                            </button>
                        </div>

                        {/* 🧾 Modal */}
                        <ModalMovimiento
                            mostrar={mostrarModal}
                            onClose={() => setMostrarModal(false)}

                            onSubmitMovimiento={handleMovimiento}
                            onSubmitRecurrente={handleRecurrente}

                            tipo={tipo}
                            setTipo={setTipo}
                            categoria={categoria}
                            setCategoria={setCategoria}
                            descripcion={descripcion}
                            setDescripcion={setDescripcion}
                            valor={valor}
                            setValor={setValor}
                            fecha={fecha}
                            setFecha={setFecha}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;


