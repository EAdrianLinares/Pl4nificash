import { useEffect, useState } from "react";
import { getMovimientos, crearMovimiento } from "../api/movimientos";
import {
    ordenarPorFecha,
    ultimosMovimientos,
    calcularDisponible
} from "../utils/movimientosUtils";

function Dashboard() {
    //lista de Movimientos
    const [movimientos, setMovimientos] = useState<any[]>([]);

    //Estado del Modal
    const [mostrarModal, setMostrarModal] = useState(false);

    //formulario
    const [tipo, setTipo] = useState("ingreso");
    const [categoria, setCategoria] = useState("fijo");
    const [descripcion, setDescripcion] = useState("");
    const [valor, setValor] = useState("");
    const [fecha, setFecha] = useState("");

    // Cargar movimientos
    useEffect(() => {
        cargarMovimientos();
    }, []);

    const cargarMovimientos = async () => {
        const data = await getMovimientos();
        console.log ("DATA", data);

        if (Array.isArray(data)) {
            const ordenados = ordenarPorFecha(data);
            setMovimientos(ordenados);
        } else {
            console.error("Error:", data);
            setMovimientos([]);
        }
    };


    // Crear movimiento
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await  crearMovimiento ({
                tipo,
                categoria,
                descripcion,
                valor: Number(valor),
                fecha,
            });

            // cerrar el Modal
            setMostrarModal(false);

            // limpiar formulario
            setDescripcion("");
            setValor("");
            setFecha("");

            // recargar lista
            await cargarMovimientos();
        } catch (error) {
            console.log("Error al guardar:", error)
        }
    };
    const ultimos5 = ultimosMovimientos(movimientos);
    const disponible = calcularDisponible(movimientos);

    return (
        <div className="container mt-4">
            <h2>Dashboard - Planificash</h2>



            {/* 🔷 LISTA */}
            <h4> Disponible: ${disponible} </h4>
            <ul className="list-group mb-4">
                {Array.isArray(ultimos5) &&
                    ultimos5.map((mov) => (
                        <li
                            key={mov.id}
                            className="list-group-item d-flex justify-content-between"
                        >
                            <span>
                                {mov.descripcion} ({mov.tipo})- {""}
                                {new Date(mov.fecha).toLocaleDateString("es-CO")}
                            </span>
                            <strong>${mov.valor}</strong>
                        </li>
                    ))}
            </ul>



            {/* 🔷 BOTÓN */}
            <button className="btn btn-success mb-3"
                onClick={() => setMostrarModal(true)}>
                Agregar Movimiento
            </button>


            {/* 🔷 MODAL */}

            {mostrarModal && (
                <>
                    <div className="modal-backdrop fade show"> </div>

                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                    >

                        <div className="modal-dialog">
                            <div className="modal-content">

                                {/* HEADER */}
                                <div className="modal-header">
                                    <h5 className="modal-title">Nuevo Movimiento</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setMostrarModal(false)}
                                    ></button>
                                </div>

                                {/* FORM */}
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">

                                        <select
                                            className="form-control mb-2"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                        >
                                            <option value="ingreso">Ingreso</option>
                                            <option value="gasto">Gasto</option>
                                        </select>

                                        <select
                                            className="form-control mb-2"
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                        >
                                            <option value="fijo">Fijo</option>
                                            <option value="variable">Variable</option>
                                        </select>

                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Descripción"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            required
                                        />

                                        <input
                                            type="number"
                                            className="form-control mb-2"
                                            placeholder="Valor"
                                            value={valor}
                                            onChange={(e) => setValor(e.target.value)}
                                            required
                                        />

                                        <input
                                            type="date"
                                            className="form-control"
                                            value={fecha}
                                            onChange={(e) => setFecha(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* FOOTER */}
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setMostrarModal(false)}
                                        >
                                            Cancelar
                                        </button>

                                        <button type="submit" className="btn btn-primary">
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard;


