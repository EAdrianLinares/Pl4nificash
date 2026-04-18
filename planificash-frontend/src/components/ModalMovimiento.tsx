type Props = {
  mostrar: boolean;
  onClose: () => void;

  //ahora diferenciamos acciones
  onSubmitMovimiento: (e: any) => void;
  onSubmitRecurrente: (e: any) => void;

  tipo: string;
  setTipo: (value: string) => void;

  categoria: string;
  setCategoria: (value: string) => void;

  descripcion: string;
  setDescripcion: (value: string) => void;

  valor: string;
  setValor: (value: string) => void;

  fecha: string;
  setFecha: (value: string) => void;
};

export const ModalMovimiento = ({
  mostrar,
  onClose,
  onSubmitMovimiento,
  onSubmitRecurrente,
  tipo,
  setTipo,
  categoria,
  setCategoria,
  descripcion,
  setDescripcion,
  valor,
  setValor,
  fecha,
  setFecha,
}: Props) => {

  if (!mostrar) return null;

  // 🔥 lógica clave
  const handleSubmit = (e: any) => {
    e.preventDefault();


    if (categoria === "Fijo") {
      onSubmitRecurrente(e);
    } else {
      onSubmitMovimiento(e);
    }

  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header">
              <h5 className="modal-title">
                {categoria === "Fijo"
                  ? "Nuevo Movimiento Recurrente"
                  : "Nuevo Movimiento"}
              </h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body">

                {/* TIPO */}
                <select
                  className="form-control mb-2"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="Ingreso">Ingreso</option>
                  <option value="Gasto">Gasto</option>
                </select>

                <select
                  className="form-control mb-2"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="Fijo">Fijo</option>
                  <option value="Variable">Variable</option>
                </select>

                {/* DESCRIPCION */}
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />

                {/* VALOR */}
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                />

                {/* FECHA SOLO PARA NO RECURRENTES */}
                {categoria !== "Fijo" && (
                  <input
                    type="date"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                )}

                {/* 🔥 MENSAJE UX */}
                {categoria === "Fijo" && (
                  <small className="text-muted">
                    Este movimiento se aplicará automáticamente cada mes
                  </small>
                )}
              </div>

              {/* FOOTER */}
              <div className="modal-footer d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>

                <button type="submit" className="btn btn-primary">
                  {categoria === "Fijo" ? "Guardar Recurrente" : "Guardar"}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};