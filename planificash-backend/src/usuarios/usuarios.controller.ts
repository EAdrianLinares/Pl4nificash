import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  listarUsuarios(@Request() req: { user: { userId: string } }) {
    return this.usuariosService.obtenerUsuarioPorId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerUsuarioPorId(@Param('id') id: string) {
    return this.usuariosService.obtenerUsuarioPorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Request() req: { user: { userId: string } }, @Body() dto: CreateUsuarioDto) {
    return this.usuariosService.upsertProfile({
      id: req.user.userId,
      nombre: dto.nombre,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.ActualizarUsuario(id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminarUsuario(@Param('id') id: string) {
    return this.usuariosService.eliminarUsuario(id);
  }
}
