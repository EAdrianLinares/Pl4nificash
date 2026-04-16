import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';
import { MovimientosRecurrentesController } from './movimientos-recurrentes.controller';
import { MovimientoRecurrente } from './entities/movimiento-recurrente.entity';
import { MovimientosModule } from 'src/movimientos/movimientos.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoRecurrente]),
  MovimientosModule],
  providers: [MovimientosRecurrentesService],
  controllers: [MovimientosRecurrentesController],

})
export class MovimientosRecurrentesModule {}
