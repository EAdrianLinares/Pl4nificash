import { useState } from "react";
import { MovimientoList } from "../components/MovimientoList";
import { useMovimientos } from "../hooks/useMovimientos";
import { ModalMovimiento } from "../components/ModalMovimiento";
import { crearMovimiento } from "../api/movimientos";
import { normalizarTipo } from "../utils/normalizers";

function Movimientos() {
  const { movimientos, cargarMovimientos } = useMovimientos();

  // FILTROS
  const hoy = new Date();
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [mesFiltro, setMesFiltro] = useState(String(hoy.getMonth() + 1));
  const [anioFiltro, setAnioFiltro] = useState(String(hoy.getFullYear()));

  // MODAL
  const [mostrarModal, setMostrarModal] = useState(false);

  // FORMULARIO
  const [tipo, setTipo] = useState("Ingreso");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState("");

  // CREAR MOVIMIENTO
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await crearMovimiento({
        tipo: normalizarTipo(tipo),
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

  // FILTRADO por año mes
  const movimientosFiltrados = movimientos.filter((m: any) => {
    const fecha = m.fecha;

    const [anio, mes] = fecha.split("-");

    const cumpleTipo = tipoFiltro ? m.tipo === tipoFiltro : true;

    const cumpleMes =
      mesFiltro !== ""
        ? Number(mes) === Number(mesFiltro)
        : true;

    const cumpleAnio =
      anioFiltro
        ? Number(anio) === Number(anioFiltro)
        : true;

    return cumpleTipo && cumpleMes && cumpleAnio;
  });

  //filtro por tipo
  const totalIngresos = movimientosFiltrados
    .filter((m: any) => m.tipo === "Ingreso")
    .reduce((acc: number, m: any) => acc + Number(m.valor), 0);

  const totalGastos = movimientosFiltrados
    .filter((m: any) => m.tipo === "Gasto")
    .reduce((acc: number, m: any) => acc + Number(m.valor), 0);

    //filtro que me permite mostrar las cards deacuerdo al filtrado
  const mostrarIngresos = tipoFiltro === "" || tipoFiltro === "Ingreso";
  const mostrarGastos = tipoFiltro === "" || tipoFiltro === "Gasto";

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
            <option value="Ingreso">Ingresos</option>
            <option value="Gasto">Gastos</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
          >
            <option value="">Mes</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
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
    

      <div className="row mb-4">

  {mostrarIngresos && (
    <div className="col-md-6">
      <div className="card border-success shadow-sm">
        <div className="card-body text-center">
          <h5 className="text-success">Ingresos</h5>
          <h3>${totalIngresos.toLocaleString("es-CO")}</h3>
        </div>
      </div>
    </div>
  )}

  {mostrarGastos && (
    <div className="col-md-6">
      <div className="card border-danger shadow-sm">
        <div className="card-body text-center">
          <h5 className="text-danger">Gastos</h5>
          <h3>${totalGastos.toLocaleString("es-CO")}</h3>
        </div>
      </div>
    </div>
  )}

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