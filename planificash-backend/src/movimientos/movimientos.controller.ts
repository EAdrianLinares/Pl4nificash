import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Request } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: { user: { userId: string } }, @Body() createMovimientoDto: CreateMovimientoDto) {
  return this.movimientosService.create(
    createMovimientoDto,
    req.user.userId, 
  );
}

   //filtro por mes
@UseGuards(JwtAuthGuard)
@Get('filtro/mes')
findByMonth(
  @Query('mes', ParseIntPipe) mes: number,
  @Query('anio', ParseIntPipe) anio: number,
  @Request() req: { user: { userId: string } },
) { return this.movimientosService.findByMonth(mes, anio, req.user.userId) }


@UseGuards(JwtAuthGuard)
@Get()
findAllByUser(@Request() req: { user: { userId: string } }) {
  return this.movimientosService.findAllByUser(req.user.userId);
}

@UseGuards(JwtAuthGuard)
@Get('disponible/actual')
getDisponibleActual(@Request() req: { user: { userId: string } }) {
  return this.movimientosService.getDisponibleActual(req.user.userId);
}

@UseGuards(JwtAuthGuard)
@Get(':id')
findOne(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
  return this.movimientosService.findOne(id, req.user.userId);
}

@UseGuards(JwtAuthGuard)
@Patch(':id')
update(@Param('id') id: string, @Request() req: { user: { userId: string } }, @Body() updateMovimientoDto: UpdateMovimientoDto) {
  return this.movimientosService.update(id, req.user.userId, updateMovimientoDto);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
remove(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
  return this.movimientosService.remove(id, req.user.userId);
}

 
}
