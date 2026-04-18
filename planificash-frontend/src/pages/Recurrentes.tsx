import { useEffect, useState } from "react";
import { normalizarTipo } from "../utils/normalizers";
import {
  getRecurrentes,
  aplicarRecurrenteIndividual,
  createRecurrente,
  updateRecurrente,
  deleteRecurrente,
} from "../api/recurrentes";
import { getMovimientos } from "../api/movimientos";
import { ModalMovimiento } from "../components/ModalMovimiento";
import { formatMoney } from "../utils/movimientosUtils";

function Recurrentes() {
  const [data, setData] = useState<any[]>([]);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [aplicadoId, setAplicadoId] = useState<number | null>(null);

  // =========================
  // CONTROL EDICIÓN
  // =========================
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // =========================
  // MODAL STATE
  // =========================
  const [mostrarModal, setMostrarModal] = useState(false);

  const [tipo, setTipo] = useState<string>("Ingreso");

  const [categoria, setCategoria] = useState<string>(
    "Fijo"
  );
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState("");

  // =========================
  // CARGAR DATA
  // =========================
  const loadData = async () => {
    try {
      const res = await getRecurrentes();
      // Asegurar que sea un array
      const recurrentesArray = Array.isArray(res) ? res : [];
      setData(recurrentesArray);
      const mov = await getMovimientos();
      setMovimientos(mov);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setData([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =========================
  // APLICAR RECURRENTE INDIVIDUAL
  // =========================
  const handleAplicarIndividual = async (id: number, _nombre?: string) => {
    try {
      setAplicadoId(id);
      const res = await aplicarRecurrenteIndividual(id);
      setMensaje(res.message);
      loadData();
      setTimeout(() => setAplicadoId(null), 3000);
    } catch (error: any) {
      setMensaje(error.message || "Error al aplicar");
      setAplicadoId(null);
    }
  };

  // =========================
  // DETECTAR SI YA FUE APLICADO EN EL MES
  // =========================
  const estaAplicadoEnMes = (recurrente: any): boolean => {
    const hoy = new Date();
    const mesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;

    return movimientos.some((m: any) => {
      const fechaMovimiento = new Date(m.fecha);
      const mesMovimiento = `${fechaMovimiento.getFullYear()}-${String(fechaMovimiento.getMonth() + 1).padStart(2, '0')}`;
      return mesMovimiento === mesActual && m.descripcion === recurrente.nombre;
    });
  };

  // =========================
  // ABRIR MODAL CREAR
  // =========================
  const abrirModal = () => {
    setEditandoId(null);

    setTipo("Ingreso");
    setCategoria("Fijo");
    setDescripcion("");
    setValor("");
    setFecha("");

    setMostrarModal(true);
  };

  // =========================
  // EDITAR
  // =========================
  const handleEditar = (rec: any) => {
    setEditandoId(rec.id);

    setTipo(rec.tipo);
    setCategoria("Fijo");
    setDescripcion(rec.nombre);
    setValor(rec.monto.toString());

    setMostrarModal(true);
  };

  // =========================
  // ELIMINAR
  // =========================
  const handleEliminar = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este recurrente?")) return;

    try {
      await deleteRecurrente(id);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // CREAR / ACTUALIZAR
  // =========================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const payload = {
        tipo: normalizarTipo(tipo),
        nombre: descripcion,
        monto: Number(valor),
        usuario_id: user.id,
      };

      if (editandoId) {
        await updateRecurrente(editandoId, payload);
      } else {
        await createRecurrente(payload);
      }

      setMostrarModal(false);
      loadData();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // =========================
  // TOTALES
  // =========================
  const ingresos = data
    .filter((rec: any) => rec.tipo?.toLowerCase() === "ingreso")
    .reduce((acc: number, rec: any) => acc + Number(rec.monto), 0);

  const gastos = data
    .filter((rec: any) => rec.tipo?.toLowerCase() === "gasto")
    .reduce((acc: number, rec: any) => acc + Number(rec.monto), 0);

  const balance = ingresos - gastos;

  // =========================
  // UI
  // =========================
  return (
    <div className="container mt-4 text-center">
      <h2>Movimientos Fijos</h2>

      {/* CARDS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-success">
            <h6>Ingresos Fijos</h6>
            <h4 className="text-success">{formatMoney(ingresos)}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-danger">
            <h6>Gastos Fijos</h6>
            <h4 className="text-danger">{formatMoney(gastos)}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm border-primary">
            <h6>Balance</h6>
            <h4 className={balance >= 0 ? "text-primary" : "text-danger"}>
              {formatMoney(balance)}
            </h4>
          </div>
        </div>
      </div>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {/* LISTADO */}
      <div className="row">
        {data.map((rec: any) => {
          const yaAplicado = estaAplicadoEnMes(rec);
          return (
            <div className="col-md-4" key={rec.id}>
              <div className="card p-3 mb-2">
                <h5>{rec.nombre}</h5>
                <p>{rec.tipo}</p>
                <p>{formatMoney(Number(rec.monto))}</p>

                {yaAplicado && (
                  <p className="text-success mb-2">
                    <small>✓ Aplicado este mes</small>
                  </p>
                )}

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAplicarIndividual(rec.id, rec.nombre)}
                    disabled={yaAplicado || aplicadoId === rec.id}
                  >
                    {aplicadoId === rec.id ? "Aplicando..." : "Aplicar"}
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditar(rec)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleEliminar(rec.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTÓN FLOTANTE */}
      <button className="btn btn-primary fab" onClick={abrirModal}>
        +
      </button>

      {/* MODAL */}
      <ModalMovimiento
        mostrar={mostrarModal}
        onClose={() => setMostrarModal(false)}
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
        categoriaDisabled={true}
      />
    </div>
  );
}

export default Recurrentes;