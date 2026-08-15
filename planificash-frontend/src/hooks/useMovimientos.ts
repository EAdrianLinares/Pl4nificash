import { useEffect, useState } from "react";
import {
  getDisponibleActual,
  getMovimientos,
  getPendientesMesSiguiente,
} from "../api/movimientos";
import {
  ordenarPorFecha,
  filtrarSinFuturas,
  ultimosMovimientos,
  calcularDisponible,
} from "../utils/movimientosUtils";

const defaultPendientes = {
  ingresos: 0,
  gastos: 0,
  neto: 0,
  hayPendientes: false,
};

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [disponible, setDisponible] = useState(0);
  const [pendientes, setPendientes] = useState(defaultPendientes);
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

      try {
        const pendientesResumen = await getPendientesMesSiguiente();
        setPendientes({
          ingresos: Number(pendientesResumen?.ingresos ?? 0),
          gastos: Number(pendientesResumen?.gastos ?? 0),
          neto: Number(pendientesResumen?.neto ?? 0),
          hayPendientes: Boolean(pendientesResumen?.hayPendientes ?? false),
        });
      } catch {
        setPendientes(defaultPendientes);
      }
    } else {
      console.error("Error:", data);
      setMovimientos([]);
      setDisponible(0);
      setPendientes(defaultPendientes);
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
    pendientes,
    loading,
    cargarMovimientos,
    setMovimientos,
  };
};