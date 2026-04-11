type Props = {
  mostrar: boolean;
  onClose: () => void;
  onSubmit: (e: any) => void;

  tipo: string;
  setTipo: any;
  categoria: string;
  setCategoria: any;
  descripcion: string;
  setDescripcion: any;
  valor: string;
  setValor: any;
  fecha: string;
  setFecha: any;
};

export const ModalMovimiento = ({
  mostrar,
  onClose,
  onSubmit,
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

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">

            {/* HEADER */}
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Movimiento</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* FORM */}
            <form onSubmit={onSubmit}>
              <div className="modal-body">

                <select
                  className="form-control mb-2"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
                </select>

                <select
                  className="form-control mb-2"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="fijo">Fijo</option>
                  <option value="variable">Variable</option>
                </select>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />

                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Valor"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                />

                <input
                  type="date"
                  className="form-control"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
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
                    Guardar
                  </button>
                </div>
              
            </form>

          </div>
        </div>
      </div>
    </>
  );
};