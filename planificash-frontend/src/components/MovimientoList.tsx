type Props = {
  movimientos: any[];
  onEdit?: (mov: any) => void;
  onDelete?: (id: string) => void;
};

export const MovimientoList = ({ movimientos, onEdit, onDelete }: Props) => {
  return (
    <ul className="list-group mb-4 movimientos-list">
      {movimientos.map((mov) => (
        <li
          key={mov.id || mov.fecha + mov.descripcion}
          className="list-group-item d-flex justify-content-between align-items-start movimiento-item"
        >
          <span className="movimiento-main text-start">
            {mov.descripcion} ({mov.tipo}) - {new Date(mov.fecha + "T00:00:00").toLocaleDateString("es-CO")}
          </span>

          <div className="d-flex align-items-center gap-2">
            <strong className="movimiento-valor">${Number(mov.valor).toLocaleString()}</strong>

            {onEdit && (
              <button
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => onEdit(mov)}
              >
                Editar
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(mov.id)}
              >
                Eliminar
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};