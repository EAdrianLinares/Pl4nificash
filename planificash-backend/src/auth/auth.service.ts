import { Injectable, BadRequestException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';


@Injectable()
export class AuthService {

  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.usuariosService.findByEmail(email);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    };
  }

  //Registro
  async register(createUsuarioDto: CreateUsuarioDto) {

    const existingUser = await this.usuariosService.findByEmail(createUsuarioDto.email);

    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    return this.usuariosService.crearUsuario(createUsuarioDto);
  }
}