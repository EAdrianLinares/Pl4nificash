import { useState } from "react";
import { crearMovimiento } from "../api/movimientos";
import { createRecurrente } from "../api/recurrentes";

import { MovimientoList } from "../components/MovimientoList";
import { DisponibleCard, PendientesCard } from "../components/DisponibleCard";
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
        pendientes,
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
            await createRecurrente({
                tipo: tipo as TipoMovimientoType,
                nombre: descripcion,
                monto: Number(valor),
            });

            await cerrarYRecargar();
        } catch (error) {
            console.log("Error recurrente:", error);
        }
    };

    // =========================
    // UI
    // =========================
    if (loading) return <p className="text-center">Cargando...</p>;

    return (
        <div className="container mt-4 dashboard-page">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">

                    <div className="text-center mb-4 dashboard-panel">
                        <h2>Dashboard</h2>

                        {/* 💰 Disponible */}
                        <DisponibleCard disponible={disponible} />

                        {/* � Pendientes */}
                        <PendientesCard
                            ingresos={pendientes.ingresos}
                            gastos={pendientes.gastos}
                            neto={pendientes.neto}
                            hayPendientes={pendientes.hayPendientes}
                        />

                        {/* �📋 Últimos movimientos */}
                        <MovimientoList movimientos={ultimos5} />

                        {/* ➕ Botón */}
                        <div className="text-center mt-3 dashboard-actions">
                            <button
                                className="btn btn-success mb-3 w-100 w-sm-auto btn-touch"
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

