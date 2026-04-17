import { useEffect, useState } from "react";
import { getRecurrentes, aplicarRecurrentes } from "../api/recurrentes";

function Recurrentes() {
  const [data, setData] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const loadData = async () => {
    const res = await getRecurrentes();
    setData(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAplicar = async () => {
    const res = await aplicarRecurrentes();
    setMensaje(res.message);
    loadData();
  };
 const ingresos = data
  .filter((rec: any) => rec.tipo === "Ingreso")
  .reduce((acc: number, rec: any) => acc + Number(rec.monto), 0);

const gastos = data
  .filter((rec: any) => rec.tipo === "Gasto")
  .reduce((acc: number, rec: any) => acc + Number(rec.monto), 0);

const balance = ingresos - gastos;

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};


  return (
    <div className="container mt-4 text-center">

      <h2>Movimientos Fijos</h2>

      <div className="row mb-4">

  {/* INGRESOS */}
  <div className="col-md-4">
    <div className="card text-center p-3 shadow-sm border-success">
      <h6>Ingresos Fijos</h6>
      <h4 className="text-success">{formatMoney(ingresos)}</h4>
    </div>
  </div>

  {/* GASTOS */}
  <div className="col-md-4">
    <div className="card text-center p-3 shadow-sm border-danger">
      <h6>Gastos Fijos</h6>
      <h4 className="text-danger">{formatMoney(gastos)}</h4>
    </div>
  </div>

  {/* BALANCE */}
  <div className="col-md-4">
    <div className="card text-center p-3 shadow-sm border-primary">
      <h6>Balance</h6>
      <h4 className={balance >= 0 ? "text-primary" : "text-danger"}>
        {formatMoney(balance)}
      </h4>
    </div>
  </div>

</div>

      <button className="btn btn-success mb-3" onClick={handleAplicar}>
        Aplicar mes
      </button>

      {mensaje && (
        <div className="alert alert-info">{mensaje}</div>
      )}

      <div className="row">
        {data.map((rec: any) => (
          <div className="col-md-4" key={rec.id}>
            <div className="card p-3 mb-3">

              <h5>{rec.nombre}</h5>
              <p>{rec.tipo}</p>
              <p>${rec.monto}</p>

              <button className="btn btn-warning btn-sm me-2">
                Editar
              </button>

              <button className="btn btn-danger btn-sm">
                Eliminar
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Recurrentes;