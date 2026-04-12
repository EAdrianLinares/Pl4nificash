import { useState } from "react";
import { MovimientoList } from "../components/MovimientoList";
import { useMovimientos } from "../hooks/useMovimientos";
import { ModalMovimiento } from "../components/ModalMovimiento";
import { crearMovimiento } from "../api/movimientos";

function Movimientos() {
  const { movimientos, cargarMovimientos } = useMovimientos();

  // FILTROS
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [mesFiltro, setMesFiltro] = useState("");
  const [anioFiltro, setAnioFiltro] = useState("");

  // MODAL
  const [mostrarModal, setMostrarModal] = useState(false);

  // FORMULARIO
  const [tipo, setTipo] = useState("ingreso");
  const [categoria, setCategoria] = useState("fijo");
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState("");

  // CREAR MOVIMIENTO
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

      // limpiar formulario
      setDescripcion("");
      setValor("");
      setFecha("");

      await cargarMovimientos();
    } catch (error) {
      console.log("Error al guardar:", error);
    }
  };

  // FILTRADO
  const movimientosFiltrados = movimientos.filter((m: any) => {
    const fechaMov = new Date(m.fecha);

    const cumpleTipo = tipoFiltro ? m.tipo === tipoFiltro : true;

    const cumpleMes =
      mesFiltro !== ""
        ? fechaMov.getMonth() === Number(mesFiltro)
        : true;

    const cumpleAnio =
      anioFiltro
        ? fechaMov.getFullYear() === Number(anioFiltro)
        : true;

    return cumpleTipo && cumpleMes && cumpleAnio;
  });

  return (
    <div className="container mt-4 text-center">
      <h2>Movimientos</h2>

      {/* FILTROS */}
      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="ingreso">Ingresos</option>
            <option value="gasto">Gastos</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
          >
            <option value="">Mes</option>
            <option value="0">Enero</option>
            <option value="1">Febrero</option>
            <option value="2">Marzo</option>
            <option value="3">Abril</option>
            <option value="4">Mayo</option>
            <option value="5">Junio</option>
            <option value="6">Julio</option>
            <option value="7">Agosto</option>
            <option value="8">Septiembre</option>
            <option value="9">Octubre</option>
            <option value="10">Noviembre</option>
            <option value="11">Diciembre</option>
          </select>
        </div>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Año"
            value={anioFiltro}
            onChange={(e) => setAnioFiltro(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setTipoFiltro("");
              setMesFiltro("");
              setAnioFiltro("");
            }}
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* LISTA */}
      <MovimientoList movimientos={movimientosFiltrados} />

      {/* BOTÓN FLOTANTE */}
      <button
        className="btn btn-primary fab"
        onClick={() => setMostrarModal(true)}
      >
        +
      </button>

      {/* MODAL */}
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
  );
}

export default Movimientos;