export const ordenarPorFecha = (movimientos: any[]) => {
  return [...movimientos].sort((a, b) => {
    const fechaA = new Date(a.fecha + "T00:00:00").getTime();
    const fechaB = new Date(b.fecha + "T00:00:00").getTime();
     return fechaB - fechaA;
  });
};

export const ultimosMovimientos = (movimientos: any[], limite = 5) => {
  return movimientos.slice(0, limite);
};

export const calcularDisponible = (movimientos: any[]) => {
  return movimientos.reduce((acc, mov) => {
    if (mov.tipo === "ingreso") return acc + mov.valor;
    if (mov.tipo === "gasto") return acc - mov.valor;
    return acc;
  }, 0);
};