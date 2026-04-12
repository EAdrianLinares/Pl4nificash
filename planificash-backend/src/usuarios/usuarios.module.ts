import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])], // <--- Muy importante
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService], // opcional, solo si otro módulo lo necesita
})
export class UsuariosModule {}
