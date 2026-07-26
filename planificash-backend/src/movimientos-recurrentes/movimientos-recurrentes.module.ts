import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';
import { MovimientosRecurrentesController } from './movimientos-recurrentes.controller';
import { MovimientoRecurrente } from './entities/movimiento-recurrente.entity';
import { MovimientosModule } from '../movimientos/movimientos.module';
import { Usuarios } from '../usuarios/entities/usuario.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoRecurrente, Usuarios]),
    MovimientosModule,
  ],
  providers: [MovimientosRecurrentesService],
  controllers: [MovimientosRecurrentesController],

})
export class MovimientosRecurrentesModule {}
