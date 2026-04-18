import type {
  TipoMovimientoType,
  CategoriaMovimientoType,
} from "../constants/movimientos";

export interface CreateMovimiento {
  tipo: TipoMovimientoType;
  categoria: CategoriaMovimientoType;
  descripcion: string;
  valor: number;
  fecha: string;
}

export interface CreateRecurrente {
  tipo: TipoMovimientoType;
  nombre: string;
  monto: number;
  usuario_id: number;
}