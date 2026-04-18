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

  // =========================
  // APLICAR RECURRENTE INDIVIDUAL
  // =========================
  async aplicarRecurrenteIndividual(recurrenteId: number, usuario_id: number) {
    // Verificar que el recurrente existe y pertenece al usuario
    const recurrente = await this.repo.findOne({
      where: { id: recurrenteId, usuario_id, activo: true },
    });

    if (!recurrente) {
      return {
        message: 'Movimiento recurrente no encontrado',
        applied: false,
      };
    }

    // Control de mes actual
    const hoy = new Date();
    const periodo = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;

    // Buscar movimientos del usuario en este mes para este recurrente
    const existentes = await this.movimientosService.findByUsuario(usuario_id);

    // Verificar si ya fue aplicado este recurrente en el mes actual
    const yaAplicado = existentes.some((m) => {
      const fecha = new Date(m.fecha);
      const mesMovimiento = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      return mesMovimiento === periodo && m.descripcion === recurrente.nombre;
    });

    if (yaAplicado) {
      return {
        message: `Ya aplicado en ${this.formatearMes(hoy)}`,
        applied: false,
      };
    }

    // Crear el movimiento
    const movimiento = await this.movimientosService.create(
      {
        tipo: recurrente.tipo,
        categoria: CategoriaMovimiento.FIJO,
        valor: recurrente.monto,
        descripcion: recurrente.nombre,
        fecha: new Date(),
      },
      usuario_id,
    );

    return {
      message: 'Aplicado correctamente',
      applied: true,
      data: movimiento,
    };
  }

  // Helper para formatear mes
  private formatearMes(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
  }
}