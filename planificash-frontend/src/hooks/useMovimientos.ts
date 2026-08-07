import { useEffect, useState } from "react";
import { getDisponibleActual, getMovimientos } from "../api/movimientos";
import {
  ordenarPorFecha,
  filtrarSinFuturas,
  ultimosMovimientos,
  calcularDisponible,
} from "../utils/movimientosUtils";

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [disponible, setDisponible] = useState(0);
  const [loading, setLoading] = useState(true);

  const cargarMovimientos = async () => {
    const data = await getMovimientos();

    if (Array.isArray(data)) {
      const ordenados = ordenarPorFecha(data);
      setMovimientos(ordenados);

      const sinFuturas = filtrarSinFuturas(ordenados);
      const disponibleLocal = calcularDisponible(sinFuturas);

      try {
        const resumen = await getDisponibleActual();
        const disponibleBackend = Number(resumen?.disponible);

        setDisponible(
          Number.isNaN(disponibleBackend) ? disponibleLocal : disponibleBackend,
        );
      } catch {
        setDisponible(disponibleLocal);
      }
    } else {
      console.error("Error:", data);
      setMovimientos([]);
      setDisponible(0);
    }

    setLoading(false);
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const movimientosSinFuturas = filtrarSinFuturas(movimientos);
  
  // Para Dashboard: últimos 5 SIN futuras
  const ultimos5 = ultimosMovimientos(movimientosSinFuturas);

  return {
    movimientos,
    ultimos5,
    disponible,
    loading,
    cargarMovimientos,
    setMovimientos,
  };
};