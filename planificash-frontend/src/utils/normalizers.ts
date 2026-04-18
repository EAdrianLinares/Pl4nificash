import type { TipoMovimientoType } from "../constants/movimientos";
import { TipoMovimiento } from "../constants/movimientos";

export const normalizarTipo = (value: string): TipoMovimientoType => {
  if (!value) return TipoMovimiento.INGRESO;

  const limpio = value.trim().toLowerCase();

  if (limpio === "ingreso") return TipoMovimiento.INGRESO;
  if (limpio === "gasto") return TipoMovimiento.GASTO;

  return TipoMovimiento.INGRESO;
};