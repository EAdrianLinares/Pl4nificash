import {IsString, IsEnum, IsNotEmpty, IsDate, IsNumber, IsDateString } from 'class-validator';
import {Type} from 'class-transformer';
import { TipoMovimiento, CategoriaMovimiento } from '../enum/movement.enum';

export class deleteMovimientoDto {
    
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
    fecha!: String;
}