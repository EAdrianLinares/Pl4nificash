export const TipoMovimiento = {
  INGRESO: "Ingreso",
  GASTO: "Gasto",
} as const;

export const CategoriaMovimiento = {
  FIJO: "Fijo",
  VARIABLE: "Variable",
} as const;

//Tipos seguros (TypeScript)
export type TipoMovimientoType =
  (typeof TipoMovimiento)[keyof typeof TipoMovimiento];

export type CategoriaMovimientoType =
  (typeof CategoriaMovimiento)[keyof typeof CategoriaMovimiento];