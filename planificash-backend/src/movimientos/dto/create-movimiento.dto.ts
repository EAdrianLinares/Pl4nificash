import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsNumber,
} from 'class-validator';

import { TipoMovimiento, CategoriaMovimiento } from '../enum/movement.enum';

export class CreateMovimientoDto {
  @IsEnum(TipoMovimiento)
  @IsNotEmpty()
  tipo!: TipoMovimiento;

  @IsEnum(CategoriaMovimiento)
  @IsNotEmpty()
  categoria!: CategoriaMovimiento;

  @IsNumber()
  @IsNotEmpty()
  valor!: number;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsNotEmpty()
  @IsDateString()
  fecha!: string;
}
