import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import {Usuarios} from '../usuarios/entities/usuario.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Movimiento,Usuarios])],
  providers: [MovimientosService],
  controllers: [MovimientosController],
  exports: [MovimientosService],
})
export class MovimientosModule {}
