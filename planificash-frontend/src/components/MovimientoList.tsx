type Props = {
  movimientos: any[];
};

export const MovimientoList = ({ movimientos }: Props) => {
  return (
    <ul className="list-group mb-4 movimientos-list">
      {movimientos.map((mov) => (
        <li
          key={mov.id || mov.fecha + mov.descripcion}
          className="list-group-item d-flex justify-content-between align-items-start movimiento-item"
        >
          <span className="movimiento-main text-start">
            {mov.descripcion} ({mov.tipo}) -{" "}
            {new Date(mov.fecha + "T00:00:00").toLocaleDateString("es-CO")}
          </span>
          <strong className="movimiento-valor">${Number(mov.valor).toLocaleString()}</strong>
        </li>
      ))}
    </ul>
  );
};