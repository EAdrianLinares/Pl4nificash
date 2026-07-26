import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { TipoMovimiento } from '../enums/tipo-movimientos.enum';

export class CreateMovimientoRecurrenteDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsEnum(TipoMovimiento)
  tipo!: TipoMovimiento;

  @IsString()
  nombre!: string;

  @IsNumber()
  monto!: number;

  @IsOptional()
  @IsString()
  frecuencia?: string;
}
