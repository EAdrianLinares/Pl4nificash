import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovimientoRecurrente } from './entities/movimiento-recurrente.entity';
import { CreateMovimientoRecurrenteDto } from './dto/create-movimiento-recurrente.dto';
import { UpdateMovimientoRecurrenteDto } from './dto/update-movimiento-recurrente.dto';
import { MovimientosService } from '../movimientos/movimientos.service';
import { CategoriaMovimiento, TipoMovimiento } from '../movimientos/enum/movement.enum';
import { Usuarios } from '../usuarios/entities/usuario.entity';

@Injectable()
export class MovimientosRecurrentesService {
  constructor(
    @InjectRepository(MovimientoRecurrente)
    private readonly repo: Repository<MovimientoRecurrente>,
    @InjectRepository(Usuarios)
    private readonly usuarioRepo: Repository<Usuarios>,
    private readonly movimientosService: MovimientosService,
  ) {}

  private mapTipoToDb(tipo: string) {
    return tipo.toLowerCase() === 'ingreso' ? 'INGRESO' : 'EGRESO';
  }

  private mapTipoFromDb(tipo: string) {
    return tipo === 'INGRESO' ? TipoMovimiento.INGRESO : TipoMovimiento.GASTO;
  }

  private toResponse(recurrente: MovimientoRecurrente) {
    return {
      id: recurrente.id,
      user_id: recurrente.userId,
      tipo: this.mapTipoFromDb(recurrente.tipo),
      nombre: recurrente.descripcion,
      monto: Number(recurrente.monto),
      activo: recurrente.activo,
      frecuencia: recurrente.frecuencia,
      fecha_inicio: recurrente.fechaInicio,
      proxima_fecha: recurrente.proximaFecha,
      fecha_fin: recurrente.fechaFin,
      categoria: recurrente.categoria,
      created_at: recurrente.createdAt,
      updated_at: recurrente.updatedAt,
    };
  }

  async create(dto: CreateMovimientoRecurrenteDto, userId: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { id: userId } });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const hoy = new Date();
    const nuevo = this.repo.create({
      userId,
      usuario,
      tipo: this.mapTipoToDb(dto.tipo),
      descripcion: dto.nombre,
      monto: dto.monto.toFixed(2),
      frecuencia: dto.frecuencia ?? 'MENSUAL',
      fechaInicio: hoy,
      proximaFecha: hoy,
      fechaFin: null,
      activo: true,
      categoria: CategoriaMovimiento.FIJO,
    });

    const saved = await this.repo.save(nuevo);
    return this.toResponse(saved);
  }

  async findAll(userId: string) {
    const recurrentes = await this.repo.find({
      where: { userId, activo: true },
    });

    return recurrentes.map((recurrente) => this.toResponse(recurrente));
  }

  async update(id: string, userId: string, dto: UpdateMovimientoRecurrenteDto) {
    const recurrente = await this.repo.findOne({
      where: { id, userId },
    });

    if (!recurrente) {
      throw new NotFoundException('Movimiento recurrente no encontrado');
    }

    if (dto.tipo) {
      recurrente.tipo = this.mapTipoToDb(dto.tipo);
    }

    if (dto.nombre !== undefined) {
      recurrente.descripcion = dto.nombre;
    }

    if (dto.monto !== undefined) {
      recurrente.monto = dto.monto.toFixed(2);
    }

    if (dto.frecuencia !== undefined) {
      recurrente.frecuencia = dto.frecuencia;
    }

    const saved = await this.repo.save(recurrente);
    return this.toResponse(saved);
  }

  async remove(id: string, userId: string) {
    const recurrente = await this.repo.findOne({
      where: { id, userId },
    });

    if (!recurrente) {
      throw new NotFoundException('Movimiento recurrente no encontrado');
    }

    recurrente.activo = false;
    await this.repo.save(recurrente);

    return { message: 'Movimiento recurrente eliminado correctamente' };
  }

  async aplicarMes(userId: string) {
    const recurrentes = await this.repo.find({
      where: { userId, activo: true },
    });

    if (recurrentes.length === 0) {
      return {
        message: 'No hay movimientos recurrentes',
        total: 0,
      };
    }

    const hoy = new Date();
    const periodo = `${hoy.getFullYear()}-${hoy.getMonth() + 1}`;
    const existentes = await this.movimientosService.findByUsuario(userId);

    const yaEjecutado = existentes.some((m) => {
      const fecha = new Date(m.fecha);
      const key = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
      return key === periodo;
    });

    if (yaEjecutado) {
      return {
        message: 'Este mes ya fue aplicado',
        total: 0,
      };
    }

    const resultados = [];

    for (const rec of recurrentes) {
      const movimiento = await this.movimientosService.create(
        {
          tipo: this.mapTipoFromDb(rec.tipo),
          categoria: CategoriaMovimiento.FIJO,
          valor: Number(rec.monto),
          descripcion: rec.descripcion,
          fecha: new Date().toISOString().slice(0, 10),
        },
        userId,
      );

      resultados.push(movimiento);
    }

    return {
      message: 'Recurrentes aplicados correctamente',
      total: resultados.length,
      data: resultados,
    };
  }

  async aplicarRecurrenteIndividual(recurrenteId: string, userId: string) {
    const recurrente = await this.repo.findOne({
      where: { id: recurrenteId, userId, activo: true },
    });

    if (!recurrente) {
      return {
        message: 'Movimiento recurrente no encontrado',
        applied: false,
      };
    }

    const hoy = new Date();
    const periodo = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
    const existentes = await this.movimientosService.findByUsuario(userId);

    const yaAplicado = existentes.some((m) => {
      const fecha = new Date(m.fecha);
      const mesMovimiento = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      return mesMovimiento === periodo && m.descripcion === recurrente.descripcion;
    });

    if (yaAplicado) {
      return {
        message: `Ya aplicado en ${this.formatearMes(hoy)}`,
        applied: false,
      };
    }

    const movimiento = await this.movimientosService.create(
      {
        tipo: this.mapTipoFromDb(recurrente.tipo),
        categoria: CategoriaMovimiento.FIJO,
        valor: Number(recurrente.monto),
        descripcion: recurrente.descripcion,
        fecha: new Date().toISOString().slice(0, 10),
      },
      userId,
    );

    return {
      message: 'Aplicado correctamente',
      applied: true,
      data: movimiento,
    };
  }

  private formatearMes(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
  }
}
