import { useState } from "react";
import { MovimientoList } from "../components/MovimientoList";
import { useMovimientos } from "../hooks/useMovimientos";
import { ModalMovimiento } from "../components/ModalMovimiento";
import {
  crearMovimiento,
  actualizarMovimiento,
  eliminarMovimiento,
} from "../api/movimientos";
import { normalizarTipo } from "../utils/normalizers";

import type { CategoriaMovimientoType } from "../types/movimiento";

function Movimientos() {
  const { movimientos, cargarMovimientos } = useMovimientos();

  const hoy = new Date();
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [mesFiltro, setMesFiltro] = useState(String(hoy.getMonth() + 1));
  const [anioFiltro, setAnioFiltro] = useState(String(hoy.getFullYear()));

  const [mostrarModal, setMostrarModal] = useState(false);
  const [movimientoEditando, setMovimientoEditando] = useState<any | null>(null);

  const [tipo, setTipo] = useState("Ingreso");
  const [categoria, setCategoria] = useState("Variable");
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState("");

  const resetForm = () => {
    setTipo("Ingreso");
    setCategoria("Variable");
    setDescripcion("");
    setValor("");
    setFecha("");
    setMovimientoEditando(null);
  };

  const abrirModalCreacion = () => {
    resetForm();
    setMostrarModal(true);
  };

  const abrirModalEdicion = (mov: any) => {
    setMovimientoEditando(mov);
    setTipo(mov.tipo || "Ingreso");
    setCategoria(mov.categoria || "Variable");
    setDescripcion(mov.descripcion || "");
    setValor(String(mov.valor ?? ""));
    setFecha(mov.fecha || "");
    setMostrarModal(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = {
        tipo: normalizarTipo(tipo),
        categoria: categoria as CategoriaMovimientoType,
        descripcion,
        valor: Number(valor),
        fecha,
      };

      if (movimientoEditando) {
        await actualizarMovimiento(movimientoEditando.id, payload);
      } else {
        await crearMovimiento(payload);
      }

      setMostrarModal(false);
      resetForm();
      await cargarMovimientos();
    } catch (error) {
      console.log("Error al guardar:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar este movimiento?")) return;

    try {
      await eliminarMovimiento(id);
      await cargarMovimientos();
    } catch (error) {
      console.log("Error al eliminar:", error);
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
    <div className="container mt-4 text-center movimientos-page">
      <h2>Movimientos</h2>

      {/* FILTROS */}
      <div className="row mb-3 g-2 filtros-row">
        <div className="col-12 col-md-3">
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

        <div className="col-12 col-md-3">
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

        <div className="col-12 col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Año"
            value={anioFiltro}
            onChange={(e) => setAnioFiltro(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-3">
          <button
            className="btn btn-secondary w-100 btn-touch"
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
    

      <div className="row mb-4 g-2">

  {mostrarIngresos && (
    <div className="col-12 col-md-6">
      <div className="card border-success shadow-sm">
        <div className="card-body text-center">
          <h5 className="text-success">Ingresos</h5>
          <h3>${totalIngresos.toLocaleString("es-CO")}</h3>
        </div>
      </div>
    </div>
  )}

  {mostrarGastos && (
    <div className="col-12 col-md-6">
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
      <MovimientoList
        movimientos={movimientosFiltrados}
        onEdit={abrirModalEdicion}
        onDelete={handleDelete}
      />

      {/* BOTÓN FLOTANTE */}
      <button
        className="btn btn-primary fab"
        onClick={abrirModalCreacion}
      >
        +
      </button>
      {/* MODAL */}
      <ModalMovimiento
        mostrar={mostrarModal}
        onClose={() => {
          setMostrarModal(false);
          resetForm();
        }}
        onSubmitMovimiento={handleSubmit}
        onSubmitRecurrente={handleSubmit}
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