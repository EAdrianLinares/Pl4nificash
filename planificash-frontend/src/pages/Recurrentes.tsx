import { useEffect, useState } from "react";
import { normalizarTipo } from "../utils/normalizers";
import {
  getRecurrentes,
  aplicarRecurrentes,
  createRecurrente,
  updateRecurrente,
  deleteRecurrente,
} from "../api/recurrentes";
import { ModalMovimiento } from "../components/ModalMovimiento";
import { formatMoney } from "../utils/movimientosUtils";

import {
  TipoMovimiento,
  CategoriaMovimiento,
} from "../constants/movimientos";

import type {
  TipoMovimientoType,
  CategoriaMovimientoType,
} from "../constants/movimientos";

function Recurrentes() {
  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // =========================
  // CONTROL EDICIÓN
  // =========================
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // =========================
  // MODAL STATE
  // =========================
  const [mostrarModal, setMostrarModal] = useState(false);

  const [tipo, setTipo] = useState<TipoMovimientoType>(
    TipoMovimiento.INGRESO
  );

  const [categoria, setCategoria] = useState<CategoriaMovimientoType>(
    CategoriaMovimiento.FIJO
  );
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [fecha, setFecha] = useState("");

  // =========================
  // CARGAR DATA
  // =========================
  const loadData = async () => {
    const res = await getRecurrentes();
    setData(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  // =========================
  // APLICAR MES
  // =========================
  const handleAplicar = async () => {
    try {
      const res = await aplicarRecurrentes();
      setMensaje(res.message);
      loadData();
    } catch (error) {
      console.log(error);
    }
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
    .filter((rec: any) => rec.tipo === "Ingreso")
    .reduce((acc: number, rec: any) => acc + Number(rec.monto), 0);

  const gastos = data
    .filter((rec: any) => rec.tipo === "Gasto")
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

      {/* APLICAR */}
      <button className="btn btn-success mb-3" onClick={handleAplicar}>
        Aplicar mes
      </button>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {/* LISTADO */}
      <div className="row">
        {data.map((rec: any) => (
          <div className="col-md-4" key={rec.id}>
            <div className="card p-3 mb-2">
              <h5>{rec.nombre}</h5>
              <p>{rec.tipo}</p>
              <p>{formatMoney(Number(rec.monto))}</p>

              <div className="d-flex justify-content-center gap-2">
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
        ))}
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
      />
    </div>
  );
}

export default Recurrentes;