import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoRecurrente } from './entities/movimiento-recurrente.entity';
import { CreateMovimientoRecurrenteDto } from './dto/create-movimiento-recurrente.dto';
import { UpdateMovimientoRecurrenteDto } from './dto/update-movimiento-recurrente.dto';
import { MovimientosService } from '../movimientos/movimientos.service';
import { CategoriaMovimiento } from 'src/movimientos/enum/movement.enum';

@Injectable()
export class MovimientosRecurrentesService {
  constructor(
    @InjectRepository(MovimientoRecurrente)
    private repo: Repository<MovimientoRecurrente>,

    private movimientosService: MovimientosService,
  ) {}

  // =========================
  // CREAR
  // =========================
  create(dto: CreateMovimientoRecurrenteDto) {
    const nuevo = this.repo.create(dto);
    return this.repo.save(nuevo);
  }

  // =========================
  // LISTAR
  // =========================
  findAll(usuario_id: number) {
    return this.repo.find({
      where: { usuario_id, activo: true },
    });
  }

  // =========================
  // ACTUALIZAR
  // =========================
  update(id: number, dto: UpdateMovimientoRecurrenteDto) {
    return this.repo.update(id, dto);
  }

  // =========================
  // ELIMINAR (SOFT DELETE)
  // =========================
  remove(id: number) {
    return this.repo.update(id, { activo: false });
  }

  // =========================
  // APLICAR MES (MEJORADO + SEGURO)
  // =========================
  async aplicarMes(usuario_id: number) {
    const recurrentes = await this.repo.find({
      where: { usuario_id, activo: true },
    });

    if (recurrentes.length === 0) {
      return {
        message: 'No hay movimientos recurrentes',
        total: 0,
      };
    }

    // 🔥 Control de mes actual
    const hoy = new Date();
    const periodo = `${hoy.getFullYear()}-${hoy.getMonth() + 1}`;

    // 🔥 Buscar movimientos del usuario
    const existentes = await this.movimientosService.findByUsuario(usuario_id);

    // 🔥 Evitar duplicado mensual (control básico seguro)
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

    // 🔥 Crear movimientos
    for (const rec of recurrentes) {
      const movimiento = await this.movimientosService.create(
        {
          tipo: rec.tipo,
          categoria: CategoriaMovimiento.FIJO,
          valor: rec.monto,
          descripcion: rec.nombre,
          fecha: new Date(),
        },
        usuario_id,
      );

      resultados.push(movimiento);
    }

    return {
      message: 'Recurrentes aplicados correctamente',
      total: resultados.length,
      data: resultados,
    };
  }
}