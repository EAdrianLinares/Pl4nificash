import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MovimientosService {

  constructor(

    @InjectRepository(Movimiento)
    private readonly movimientoRepo: Repository<Movimiento>,

    @InjectRepository(Usuarios)
    private readonly usuarioRepo: Repository<Usuarios>,
  ) { }

  async create(createMovimientoDto: CreateMovimientoDto, userId: number) {
    const usuario = await this.usuarioRepo.findOne(
      {
        where: { id: userId },
      })

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const movimiento = this.movimientoRepo.create({
      ...createMovimientoDto, usuario,
    });
    return await this.movimientoRepo.save(movimiento)
  }


  async findAll() {
    return await this.movimientoRepo.find({
      relations: ['usuario'],
    })
  }

  async findOne(id: number) {
    const movimiento = await this.movimientoRepo.findOne({
      where: { id },
      relations: ['usuario']
    });
    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado')
    }
    return movimiento;
  }


  async update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    const movimiento = await this.findOne(id);
    const movimientoActualizado = Object.assign(movimiento, updateMovimientoDto);
    return await this.movimientoRepo.save(movimientoActualizado);
  }



  async remove(id: number) {
    const movimiento = await this.findOne(id);
    await this.movimientoRepo.remove(movimiento);
    return {message: 'Movimiento eliminado correctamente'};
  }
}
