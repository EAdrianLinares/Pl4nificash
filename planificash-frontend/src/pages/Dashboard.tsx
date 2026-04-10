import { useEffect, useState } from "react";
import { getMovimientos, crearMovimiento } from "../api/movimientos";
import { data } from "react-router-dom";


function Dashboard() {
    const [movimientos, setMovimientos] = useState<any[]>([]);

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

        console.log("DATA BACKEND:", data);

        if (Array.isArray(data)) {
            setMovimientos(data);
        } else {
            console.error("Error:", data);
            setMovimientos([]);
        }
    };


    // Crear movimiento
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await crearMovimiento({
            tipo,
            categoria,
            descripcion,
            valor: Number(valor),
            fecha,
        });


        // limpiar formulario
        setDescripcion("");
        setValor("");
        setFecha("");

        // recargar lista
        await cargarMovimientos();



    };

    return (
        <div className="container mt-4">
            <h2>Dashboard - Planificash</h2>



            {/* 🔷 LISTA */}
            <ul className="list-group mb-4">
                {Array.isArray(movimientos) &&
                    movimientos.map((mov) => (
                        <li
                            key={mov.id}
                            className="list-group-item d-flex justify-content-between"
                        >
                            <span>
                                {mov.descripcion} ({mov.tipo})
                            </span>
                            <strong>${mov.valor}</strong>
                        </li>
                    ))}
            </ul>



            {/* 🔷 BOTÓN */}
            <button className="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#modalMovimiento">
                Agregar Movimiento
            </button>


            {/* 🔷 MODAL */}
            <div
                className="modal fade"
                id="modalMovimiento"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* HEADER */}
                        <div className="modal-header">
                            <h5 className="modal-title">Nuevo Movimiento</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
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
                                    data-bs-dismiss="modal"
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
        </div>
    );
}

export default Dashboard;