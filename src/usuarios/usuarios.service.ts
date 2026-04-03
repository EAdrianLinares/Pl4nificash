/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Usuarios} from './entities/usuario.entity'
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepo: Repository<Usuarios>
  ){}

  //crea un usuario
  async crearUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuarios> {
    const usuario = this.usuarioRepo.create(createUsuarioDto); //Mapeamos
    return this.usuarioRepo.save(usuario); //guardamos el Usuario
  }

  //Busca todos los usuarios con movimientos
  async listarUsuarios(): Promise<Usuarios[]> {
    return this.usuarioRepo.find({relations: ['movimientos']});
  }

  //Busca usuario por Id
  async obtenerUsuarioPorId(id: number): Promise<Usuarios> {
    const usuario = await this.usuarioRepo.findOne({
      where: {id},
      relations: ['Movimientos'],
    });
    if (!usuario){
      throw new NotFoundException ('Usuario con id ${id} no encontrado');
    }
    return usuario;
  }

//Actualizar un usuario 
  async ActualizarUsuario(id: number, 
    updateUsuarioDto: UpdateUsuarioDto): Promise<Usuarios> {
      const usuario = await this.obtenerUsuarioPorId(id);
      Object.assign(usuario,UpdateUsuarioDto); //actualiza los campos enviados
    return this.usuarioRepo.save(usuario);
  }

  //Eliminar Usuario
  async eliminarUsuario(id: number): Promise<void> {
    const  resultado = await this.usuarioRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException('Usuairo con id ${id} no encontrado')
    }
    }
  }
