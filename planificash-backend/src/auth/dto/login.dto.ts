import {IsEmail, IsString} from 'class-validator';

export class LoginDto {

    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

}

//comentario sin relevancia para validar por que no cambia en el Github
//sigue sin aparecer ninguna alerta de modificaciones
