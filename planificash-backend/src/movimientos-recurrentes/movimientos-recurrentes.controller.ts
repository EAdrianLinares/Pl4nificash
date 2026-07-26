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
  UseGuards,
  Request,
} from '@nestjs/common';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';
import { CreateMovimientoRecurrenteDto } from './dto/create-movimiento-recurrente.dto';
import { UpdateMovimientoRecurrenteDto } from './dto/update-movimiento-recurrente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('movimientos-recurrentes')
export class MovimientosRecurrentesController {
  constructor(private readonly service: MovimientosRecurrentesService) {}

  // Crear
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: { user: { userId: string } },
    @Body() dto: CreateMovimientoRecurrenteDto,
  ) {
    try {
      return await this.service.create(dto, req.user.userId);
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
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.service.findAll(req.user.userId);
  }

  // Actualizar
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMovimientoRecurrenteDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.service.update(id, req.user.userId, dto);
  }

  // Eliminar (soft)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: { userId: string } }) {
    return this.service.remove(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('aplicar-mes')
  aplicarMes(@Request() req: { user: { userId: string } }) {
    return this.service.aplicarMes(req.user.userId);
  }

  // Aplicar recurrente individual
  @UseGuards(JwtAuthGuard)
  @Post(':id/aplicar')
  aplicarRecurrenteIndividual(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.service.aplicarRecurrenteIndividual(id, req.user.userId);
  }
}