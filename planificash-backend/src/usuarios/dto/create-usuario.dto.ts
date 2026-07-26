/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsUUID,
  IsOptional,
  IsEmail,
} from 'class-validator';


export class CreateUsuarioDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;
}
