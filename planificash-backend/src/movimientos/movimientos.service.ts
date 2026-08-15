import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { Movimiento } from './entities/movimiento.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';
import { TipoMovimiento } from './enum/movement.enum';

type MovimientoResponse = {
  id: string;
  tipo: string;
  categoria: string | null;
  valor: number;
  descripcion: string;
  fecha: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepo: Repository<Movimiento>,
    @InjectRepository(Usuarios)
    private readonly usuarioRepo: Repository<Usuarios>,
  ) {}

  private mapTipoToDb(tipo: string) {
    return tipo.toLowerCase() === 'ingreso' ? 'INGRESO' : 'EGRESO';
  }

  private mapTipoFromDb(tipo: string) {
    return tipo === 'INGRESO' ? TipoMovimiento.INGRESO : TipoMovimiento.GASTO;
  }

  private toResponse(movimiento: Movimiento): MovimientoResponse {
    return {
      id: movimiento.id,
      tipo: this.mapTipoFromDb(movimiento.tipo),
      categoria: movimiento.categoria,
      valor: Number(movimiento.monto),
      descripcion: movimiento.descripcion,
      fecha: new Date(movimiento.fecha).toISOString().slice(0, 10),
      user_id: movimiento.userId,
      created_at: movimiento.createdAt,
      updated_at: movimiento.updatedAt,
    };
  }

  private toResponses(movimientos: Movimiento[]) {
    return movimientos.map((movimiento) => this.toResponse(movimiento));
  }

  async findByUsuario(userId: string) {
    const movimientos = await this.movimientoRepo.find({
      where: {
        userId,
      },
      relations: ['usuario'],
    });

    return this.toResponses(movimientos);
  }

  async getDisponibleActual(userId: string) {
    const today = new Date().toISOString().slice(0, 10);

    const result = await this.movimientoRepo
      .createQueryBuilder('movimiento')
      .select(
        `COALESCE(SUM(CASE WHEN movimiento.tipo = 'INGRESO' THEN movimiento.monto ELSE 0 END), 0)`,
        'ingresos',
      )
      .addSelect(
        `COALESCE(SUM(CASE WHEN movimiento.tipo = 'EGRESO' THEN movimiento.monto ELSE 0 END), 0)`,
        'gastos',
      )
      .where('movimiento.user_id = :userId', { userId })
      .andWhere('movimiento.fecha <= :today', { today })
      .getRawOne<{ ingresos: string; gastos: string }>();

    const ingresos = Number(result?.ingresos ?? 0);
    const gastos = Number(result?.gastos ?? 0);

    return {
      disponible: ingresos - gastos,
    };
  }

  async getPendientesMesSiguiente(userId: string) {
    const desde = new Date();
    desde.setHours(0, 0, 0, 0);

    const hasta = new Date(
      desde.getFullYear(),
      desde.getMonth() + 2,
      0,
    );
    hasta.setHours(0, 0, 0, 0);

    const result = await this.movimientoRepo
      .createQueryBuilder('movimiento')
      .select(
        `COALESCE(SUM(CASE WHEN movimiento.tipo = 'INGRESO' THEN movimiento.monto ELSE 0 END), 0)`,
        'ingresos',
      )
      .addSelect(
        `COALESCE(SUM(CASE WHEN movimiento.tipo = 'EGRESO' THEN movimiento.monto ELSE 0 END), 0)`,
        'gastos',
      )
      .where('movimiento.user_id = :userId', { userId })
      .andWhere('movimiento.fecha >= :desde', {
        desde: desde.toISOString().slice(0, 10),
      })
      .andWhere('movimiento.fecha <= :hasta', {
        hasta: hasta.toISOString().slice(0, 10),
      })
      .getRawOne<{ ingresos: string; gastos: string }>();

    const ingresos = Number(result?.ingresos ?? 0);
    const gastos = Number(result?.gastos ?? 0);
    const neto = ingresos - gastos;

    return {
      ingresos,
      gastos,
      neto,
      hayPendientes: ingresos !== 0 || gastos !== 0 || neto !== 0,
      desde: desde.toISOString().slice(0, 10),
      hasta: hasta.toISOString().slice(0, 10),
    };
  }

  async create(createMovimientoDto: CreateMovimientoDto, userId: string) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: userId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const movimiento = this.movimientoRepo.create({
      userId,
      usuario,
      tipo: this.mapTipoToDb(createMovimientoDto.tipo),
      categoria: createMovimientoDto.categoria,
      monto: createMovimientoDto.valor.toFixed(2),
      descripcion: createMovimientoDto.descripcion,
      fecha: new Date(createMovimientoDto.fecha),
    });

    const saved = await this.movimientoRepo.save(movimiento);
    return this.toResponse(saved);
  }

  async findAllByUser(userId: string) {
    const movimientos = await this.movimientoRepo.find({
      where: {
        userId,
      },
      relations: ['usuario'],
    });

    return this.toResponses(movimientos);
  }

  async findOne(id: string, userId: string) {
    const movimiento = await this.movimientoRepo.findOne({
      where: { id, userId },
      relations: ['usuario'],
    });

    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    return this.toResponse(movimiento);
  }

  async update(
    id: string,
    userId: string,
    updateMovimientoDto: UpdateMovimientoDto,
  ) {
    const movimiento = await this.movimientoRepo.findOne({
      where: { id, userId },
      relations: ['usuario'],
    });

    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    if (updateMovimientoDto.tipo) {
      movimiento.tipo = this.mapTipoToDb(updateMovimientoDto.tipo);
    }

    if (updateMovimientoDto.categoria !== undefined) {
      movimiento.categoria = updateMovimientoDto.categoria;
    }

    if (updateMovimientoDto.valor !== undefined) {
      movimiento.monto = updateMovimientoDto.valor.toFixed(2);
    }

    if (updateMovimientoDto.descripcion !== undefined) {
      movimiento.descripcion = updateMovimientoDto.descripcion;
    }

    if (updateMovimientoDto.fecha !== undefined) {
      movimiento.fecha = new Date(updateMovimientoDto.fecha);
    }

    const saved = await this.movimientoRepo.save(movimiento);
    return this.toResponse(saved);
  }

  async remove(id: string, userId: string) {
    const movimiento = await this.movimientoRepo.findOne({
      where: { id, userId },
      relations: ['usuario'],
    });

    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    await this.movimientoRepo.remove(movimiento);
    return { message: 'Movimiento eliminado correctamente' };
  }

  async findByMonth(mes: number, anio: number, userId: string) {
    const inicio = new Date(anio, mes - 1, 1);
    const fin = new Date(anio, mes, 0);

    const movimientos = await this.movimientoRepo
      .createQueryBuilder('movimiento')
      .where('movimiento.fecha BETWEEN :inicio AND :fin', {
        inicio,
        fin,
      })
      .andWhere('movimiento.user_id = :userId', { userId })
      .leftJoinAndSelect('movimiento.usuario', 'usuario')
      .getMany();

    return this.toResponses(movimientos);
  }
}
