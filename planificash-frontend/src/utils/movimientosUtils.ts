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

    const tipo = mov.tipo?.trim();

    const valor = Number(mov.valor);
    const acumulado = Number(acc);

    if (isNaN(valor)) return acumulado;

    if (tipo === "Ingreso") return acumulado + valor;
    if (tipo === "Gasto") return acumulado - valor;

    return acumulado;

  }, 0);
};

// 🔥 FORMATO GLOBAL DE DINERO
export const formatMoney = (value: number) => {
  return `$${new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
  }).format(value)}`;
};
