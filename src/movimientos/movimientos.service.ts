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
      });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const movimiento = this.movimientoRepo.create({
      ...createMovimientoDto, usuario,
    });
    return this.movimientoRepo.save(movimiento)
  }


  async findAllByUser(userId: number) {
    return await this.movimientoRepo.find({
      where: {
        usuario: { id: userId },
      },
      relations: ['usuario'],
    });
  }

  async findOne(id: number, userId: number) {
    const movimiento = await this.movimientoRepo.findOne({
      where: { id, usuario: { id: userId }},
  relations: ['usuario'],
});
if (!movimiento) {
  throw new NotFoundException('Movimiento no encontrado')
}
return movimiento;
  }


  async update(id: number,  userId: number, updateMovimientoDto: UpdateMovimientoDto) {
  const movimiento = await this.findOne(id, userId);
  Object.assign(movimiento, updateMovimientoDto);
  return await this.movimientoRepo.save(movimiento);
}



  async remove(id: number, userId:number) {
  const movimiento = await this.findOne(id, userId);
  await this.movimientoRepo.remove(movimiento);
  return { message: 'Movimiento eliminado correctamente' };
}

  //filtro para mes y año

  async findByMonth(mes: number, anio: number, userId: number) {
  const inicio = new Date(anio, mes - 1, 1);
  const fin = new Date(anio, mes, 0);
  return await this.movimientoRepo
    .createQueryBuilder('movimiento')
    .where('movimiento.fecha BETWEEN :inicio AND :fin', {
      inicio,
      fin,
    })
    .andWhere('usuarioId = :userId', {userId})
    .leftJoinAndSelect('movimiento.usuario', 'usuario')
    .getMany();

}
}
