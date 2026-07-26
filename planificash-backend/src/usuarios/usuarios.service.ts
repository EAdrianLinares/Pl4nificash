import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuarios } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepo: Repository<Usuarios>,
    private readonly configService: ConfigService,
  ) {}

  async upsertProfile(profile: { id: string; nombre: string }) {
    const existing = await this.usuarioRepo.findOne({
      where: { id: profile.id },
    });

    if (existing) {
      existing.nombre = profile.nombre;
      return this.usuarioRepo.save(existing);
    }

    const usuario = this.usuarioRepo.create(profile);
    return this.usuarioRepo.save(usuario);
  }

  async crearUsuario(createUsuarioDto: CreateUsuarioDto) {
    if (!createUsuarioDto.id) {
      throw new BadRequestException('id es requerido para crear el perfil');
    }

    return this.upsertProfile({
      id: createUsuarioDto.id,
      nombre: createUsuarioDto.nombre,
    });
  }

  async findById(id: string) {
    return this.usuarioRepo.findOne({
      where: { id },
    });
  }

  async listarUsuarios(): Promise<Usuarios[]> {
    return this.usuarioRepo.find();
  }

  async obtenerUsuarioPorId(id: string): Promise<Usuarios> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return usuario;
  }

  async ActualizarUsuario(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuarios> {
    const usuario = await this.obtenerUsuarioPorId(id);

    if (updateUsuarioDto.nombre !== undefined) {
      usuario.nombre = updateUsuarioDto.nombre;
    }

    return this.usuarioRepo.save(usuario);
  }

  async eliminarUsuario(id: string): Promise<void> {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const serviceRoleKey = this.configService.get<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    if (!supabaseUrl || !serviceRoleKey) {
      throw new BadRequestException('Supabase no está configurado');
    }

    const response = await fetch(`${supabaseUrl}/auth/v1/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    });

    if (!response.ok && response.status !== 404) {
      throw new BadRequestException('No se pudo eliminar el usuario en Auth');
    }

    const resultado = await this.usuarioRepo.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
  }
}
