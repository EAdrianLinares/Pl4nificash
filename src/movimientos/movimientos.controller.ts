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
  create(@Request() req:any, @Body() createMovimientoDto: CreateMovimientoDto) {
  return this.movimientosService.create(
    createMovimientoDto,
    req.user.userId, 
  );
}

   //filtro por mes
  @Get('filtro/mes')
  findByMonth(
    @Query('mes') mes: number,
    @Query('anio') anio: number,
    @Request() req:any,
  ) { return this.movimientosService.findByMonth(mes, anio, req.user.userId) }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@Request()req) {
    return this.movimientosService.findAllByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request()req:any) {
    return this.movimientosService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req:any, @Body() updateMovimientoDto: UpdateMovimientoDto) {
    return this.movimientosService.update(+id, req.user.userId, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req:any) {
    return this.movimientosService.remove(+id, req.user.userId);
  }

 
}
