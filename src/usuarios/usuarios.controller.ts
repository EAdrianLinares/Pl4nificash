import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.crearUsuario(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  listarUsuarios(@Request() req) {
    return this.usuariosService.obtenerUsuarioPorId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerUsuarioPorId(@Param('id') id: string) {
    return this.usuariosService.obtenerUsuarioPorId(+id);
  }

  @UseGuards(JwtAuthGuard)  
  @Patch(':id')
  Actualizar(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.ActualizarUsuario(+id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
eliminarUsuario(@Param('id') id: string) {
    return this.usuariosService.eliminarUsuario(+id);
  }
}
