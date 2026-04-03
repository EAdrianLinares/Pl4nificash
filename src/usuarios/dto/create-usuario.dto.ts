/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail, } from 'class-validator';


export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
