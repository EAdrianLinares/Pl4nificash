import { formatMoney } from "../utils/movimientosUtils";

type Props = {
  disponible: number;
};

export const DisponibleCard = ({ disponible }: Props) => {
  return (
    <div className="card mb-4 shadow border-0 text-center bg-light">
      <div className="card-body">
        <h5 className="card-title text-muted">Disponible</h5>
        <h3 className="card-text text-success fw-bold">{formatMoney(disponible)}</h3>
      </div>
    </div>
  );
};

type PendientesCardProps = {
  ingresos: number;
  gastos: number;
  neto: number;
  hayPendientes: boolean;
};

export const PendientesCard = ({
  ingresos,
  gastos,
  neto,
  hayPendientes,
}: PendientesCardProps) => {
  if (!hayPendientes) {
    return null;
  }

  const gastosTexto = gastos < 0 ? `($${Math.abs(gastos).toLocaleString()})` : `$${gastos.toLocaleString()}`;
  const netoTexto = neto < 0 ? `($${Math.abs(neto).toLocaleString()})` : `$${neto.toLocaleString()}`;

  return (
    <div className="card mb-4 shadow border-0 bg-light">
      <div className="card-body text-start">
        <h5 className="card-title text-muted mb-3">Pendientes</h5>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">Ingresos:</span>
          <span className="text-success fw-semibold">${ingresos.toLocaleString()}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">Gastos:</span>
          <span className={gastos < 0 ? "text-danger fw-semibold" : "text-dark fw-semibold"}>{gastosTexto}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted">Neto:</span>
          <span className={neto < 0 ? "text-danger fw-bold" : "text-primary fw-bold"}>{netoTexto}</span>
        </div>
      </div>
    </div>
  );
};