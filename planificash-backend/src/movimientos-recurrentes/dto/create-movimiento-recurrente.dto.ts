import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TipoMovimiento } from '../enums/tipo-movimientos.enum';

export class CreateMovimientoRecurrenteDto {
  @IsNumber()
  usuario_id: number;

  @IsEnum(TipoMovimiento)
  tipo: TipoMovimiento;

  @IsString()
  nombre: string;

  @IsNumber()
  monto: number;
}