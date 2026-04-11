type Props = {
  disponible: number;
};

export const DisponibleCard = ({ disponible }: Props) => {
  return (
    
    
    <div className="card mb-4 shadow border-0 text-center bg-light">
      <div className="card-body">
        <h5 className="card-title text-muted">Disponible</h5>
        <h3 className="card-text text-success fw-bold">
          ${disponible.toLocaleString()}</h3>
      </div>
    </div>
  );
};