type Props = {
  disponible: number;
};

export const DisponibleCard = ({ disponible }: Props) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Disponible</h5>
        <h3 className="card-text">${disponible}</h3>
      </div>
    </div>
  );
};