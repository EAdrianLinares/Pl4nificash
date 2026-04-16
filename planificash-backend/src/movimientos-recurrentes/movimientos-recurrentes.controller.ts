import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';
import { CreateMovimientoRecurrenteDto } from './dto/create-movimiento-recurrente.dto';
import { UpdateMovimientoRecurrenteDto } from './dto/update-movimiento-recurrente.dto';

@Controller('movimientos-recurrentes')
export class MovimientosRecurrentesController {
  constructor(private readonly service: MovimientosRecurrentesService) {}

  // Crear
  @Post()
  create(@Body() dto: CreateMovimientoRecurrenteDto) {
    return this.service.create(dto);
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
}