/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuario.entity'
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepo: Repository<Usuarios>
  ) { }

  //crea un usuario
  async crearUsuario(createUsuarioDto: CreateUsuarioDto) {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUsuarioDto.password, saltRounds,
    );

    const usuario = this.usuarioRepo.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
    return this.usuarioRepo.save(usuario);
    //guardamos el Usuario
  }



  async findByEmail(email: string) {
    return this.usuarioRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'nombre'],
    })
  }

  //Busca todos los usuarios con movimientos
  async listarUsuarios(): Promise<Usuarios[]> {
    return this.usuarioRepo.find({ relations: ['movimientos'] });
  }

  //Busca usuario por Id
  async obtenerUsuarioPorId(id: number): Promise<Usuarios> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      relations: ['movimientos'],
    });
    if (!usuario) {
      throw new NotFoundException('Usuario con id ${id} no encontrado');
    }
    return usuario;
  }

  //Actualizar un usuario 
  async ActualizarUsuario(id: number,
    updateUsuarioDto: UpdateUsuarioDto): Promise<Usuarios> {
    const usuario = await this.obtenerUsuarioPorId(id);

    if (updateUsuarioDto.password) {
      const saltRounds = 10;
      updateUsuarioDto.password = await bcrypt.hash(
        updateUsuarioDto.password,
        saltRounds,
      );
    }
    Object.assign(usuario, updateUsuarioDto); //actualiza los campos enviados
    return this.usuarioRepo.save(usuario);
  }

  //Eliminar Usuario
  async eliminarUsuario(id: number): Promise<void> {
    const resultado = await this.usuarioRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException('Usuairo con id ${id} no encontrado')
    }
  }
}
