import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';
import { CreateMovimientoRecurrenteDto } from './dto/create-movimiento-recurrente.dto';
import { UpdateMovimientoRecurrenteDto } from './dto/update-movimiento-recurrente.dto';

@Controller('movimientos-recurrentes')
export class MovimientosRecurrentesController {
  constructor(private readonly service: MovimientosRecurrentesService) {}

  // Crear
  @Post()
  async create(@Body() dto: CreateMovimientoRecurrenteDto) {
    try {
      // Validar que usuario_id esté presente
      if (!dto.usuario_id) {
        throw new BadRequestException('usuario_id es requerido');
      }

      // Validar que tipo sea válido
      if (!dto.tipo || !['Ingreso', 'Gasto'].includes(dto.tipo)) {
        throw new BadRequestException('tipo debe ser "Ingreso" o "Gasto"');
      }

      // Validar nombre
      if (!dto.nombre || typeof dto.nombre !== 'string') {
        throw new BadRequestException('nombre es requerido y debe ser texto');
      }

      // Validar monto
      if (!dto.monto || Number(dto.monto) <= 0) {
        throw new BadRequestException('monto debe ser un número mayor a 0');
      }

      return await this.service.create(dto);
    } catch (error) {
      console.error('Error en POST /movimientos-recurrentes:', error);
      
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al crear movimiento recurrente',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Listar
  @Get()
  findAll(@Query('usuario_id') usuario_id: number) {
    return this.service.findAll(Number(usuario_id));
  }

  // Actualizar
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateMovimientoRecurrenteDto,
  ) {
    return this.service.update(Number(id), dto);
  }

  // Eliminar (soft)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(Number(id));
  }

  @Post('aplicar-mes')
  aplicarMes(@Body('usuario_id') usuario_id: number) {
    return this.service.aplicarMes(Number(usuario_id));
  }

  // Aplicar recurrente individual
  @Post(':id/aplicar')
  aplicarRecurrenteIndividual(
    @Param('id') id: number,
    @Body('usuario_id') usuario_id: number,
  ) {
    return this.service.aplicarRecurrenteIndividual(
      Number(id),
      Number(usuario_id),
    );
  }
}