import { Injectable } from '@nestjs/common';
import { UsuariosService} from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser (email:string, password:string) {
    const user = await this.usuariosService.findByEmail(email); 

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return null;
      
    return user;
  }

    async login (user:any) {
      const payload = {sub: user.id, email:user.email}
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
