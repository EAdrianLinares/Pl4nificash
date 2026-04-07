import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Request } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createMovimientoDto: CreateMovimientoDto) {
  return this.movimientosService.create(
    createMovimientoDto,
    req.user.userId, 
  );
}

   //filtro por mes
  @Get('filtro/mes')
  findByMonth(
    @Query('mes', ParseIntPipe) mes: number,
    @Query('anio', ParseIntPipe) anio: number,
  ) { return this.movimientosService.findByMonth(mes, anio) }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@Request()req) {
    return this.movimientosService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovimientoDto: UpdateMovimientoDto) {
    return this.movimientosService.update(+id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosService.remove(+id);
  }

 
}
