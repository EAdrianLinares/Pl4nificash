import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) { }

  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    const userId = 1;//para pruebas
    return this.movimientosService.create(createMovimientoDto, userId);
  }

   //filtro por mes
  @Get('filtro/mes')
  findByMonth(
    @Query('mes', ParseIntPipe) mes: number,
    @Query('anio', ParseIntPipe) anio: number,
  ) { return this.movimientosService.findByMonth(mes, anio) }

  @Get()
  findAll() {
    return this.movimientosService.findAll();
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
