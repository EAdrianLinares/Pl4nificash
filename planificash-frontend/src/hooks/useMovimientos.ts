import { useEffect, useState } from "react";
import { getMovimientos } from "../api/movimientos";
import {
  ordenarPorFecha,
  ultimosMovimientos,
  calcularDisponible,
} from "../utils/movimientosUtils";

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarMovimientos = async () => {
    const data = await getMovimientos();

    if (Array.isArray(data)) {
      const ordenados = ordenarPorFecha(data);
      setMovimientos(ordenados);
    } else {
      console.error("Error:", data);
      setMovimientos([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);
  
  const ultimos5 = ultimosMovimientos(movimientos);
  const disponible = calcularDisponible(movimientos);

  return {
    movimientos,
    ultimos5,
    disponible,
    loading,
    cargarMovimientos,
    setMovimientos, // 🔥 importante para el handleSubmit
  };
};