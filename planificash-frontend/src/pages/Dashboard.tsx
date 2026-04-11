import { useState } from "react";
import { crearMovimiento } from "../api/movimientos";
import { MovimientoList } from "../components/MovimientoList";
import { DisponibleCard } from "../components/DisponibleCard";
import { ModalMovimiento } from "../components/ModalMovimiento";
import { useMovimientos } from "../hooks/useMovimientos";



function Dashboard() {
   
    const {
        movimientos,
        ultimos5,
        disponible,
        loading,
        cargarMovimientos,
    } = useMovimientos();

    
    // Estado del Modal
    const [mostrarModal, setMostrarModal] = useState(false);

    // formulario
    const [tipo, setTipo] = useState("ingreso");
    const [categoria, setCategoria] = useState("fijo");
    const [descripcion, setDescripcion] = useState("");
    const [valor, setValor] = useState("");
    const [fecha, setFecha] = useState("");

    // Crear movimiento
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await crearMovimiento({
                tipo,
                categoria,
                descripcion,
                valor: Number(valor),
                fecha,
            });

            setMostrarModal(false);

            setDescripcion("");
            setValor("");
            setFecha("");

            await cargarMovimientos();
        } catch (error) {
            console.log("Error al guardar:", error);
        }
    };

    if (loading) return <p>Cargando...</p>;


    return (
        <div className="container mt-4">
            <h2>Dashboard - Planificash</h2>

            {/*Lista */}
            <DisponibleCard disponible={disponible} />
            <MovimientoList movimientos={ultimos5} />

            {/*Botón*/}
            <button className="btn btn-success mb-3"
                onClick={() => setMostrarModal(true)}>
                Agregar Movimiento
            </button>

            {/*Click botón => Modal*/}

            <ModalMovimiento
                mostrar={mostrarModal}
                onClose={() => setMostrarModal(false)}
                onSubmit={handleSubmit}
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
    )
}

export default Dashboard;


