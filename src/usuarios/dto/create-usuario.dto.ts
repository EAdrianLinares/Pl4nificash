/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail, MinLength, } from 'class-validator';


export class CreateUsuarioDto {
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
