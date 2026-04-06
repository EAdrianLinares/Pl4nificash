import {IsString, IsEnum, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import {Type} from 'class-transformer';
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

    //convertir a fecha un string
    @Type (()=>Date)
    @IsNotEmpty()
    @IsDate()
    fecha!: Date;
    
}

