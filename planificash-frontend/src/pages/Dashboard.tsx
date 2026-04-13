import { useState } from "react";
import { crearMovimiento } from "../api/movimientos";
import { MovimientoList } from "../components/MovimientoList";
import { DisponibleCard } from "../components/DisponibleCard";
import { ModalMovimiento } from "../components/ModalMovimiento";
import { useMovimientos } from "../hooks/useMovimientos";


function Dashboard() {

    const {
        ultimos5,
        disponible,
        loading,
        cargarMovimientos,
    } = useMovimientos();


    // Estado del Modal
    const [mostrarModal, setMostrarModal] = useState(false);

    // formulario
    const [tipo, setTipo] = useState("Ingreso");
    const [categoria, setCategoria] = useState("Fijo");
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
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">


                    <div className="text-center mb-4">
                        <h2>Dashboard</h2>

                        {/*Lista */}
                        <DisponibleCard disponible={disponible} />
                        <MovimientoList movimientos={ultimos5} />

                        {/*Botón*/}
                        <div className="text-center mt-3">
                            <button className="btn btn-success mb-3"
                                onClick={() => setMostrarModal(true)}>
                                Agregar Movimiento
                            </button>
                        </div>

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
                </div>
            </div>
        </div>
    )
}

export default Dashboard;


