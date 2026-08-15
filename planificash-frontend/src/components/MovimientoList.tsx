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
          className="list-group-item d-flex justify-content-between align-items-center movimiento-item"
        >
          <div className="movimiento-main text-start">
            {mov.descripcion} ({mov.tipo}) - {new Date(mov.fecha + "T00:00:00").toLocaleDateString("es-CO")}
          </div>

          <div className="movimiento-actions d-flex align-items-center justify-content-end gap-2">
            <strong className="movimiento-valor">${Number(mov.valor).toLocaleString()}</strong>

            {onEdit && (
              <button
                type="button"
                className="btn btn-warning movimiento-action-btn"
                onClick={() => onEdit(mov)}
                aria-label="Editar movimiento"
              >
                ✏️
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                className="btn btn-danger movimiento-action-btn"
                onClick={() => onDelete(mov.id)}
                aria-label="Eliminar movimiento"
              >
                🗑️
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};