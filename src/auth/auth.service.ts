import { Injectable } from '@nestjs/common';
import { UsuariosService} from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser (email:string, password:string) {
    const user = await this.usuariosService.findByEmail(email); 

    if (!user) return null;
    
    if(user.password !== password) return null;
    
    return user;
  }

    async login (user:any) {
      const payload = {sub: user.id, email:user.email}
      return {
        acces_token: this.jwtService.sign(payload),
      };
    }
  }
