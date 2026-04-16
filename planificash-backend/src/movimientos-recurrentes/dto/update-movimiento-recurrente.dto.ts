import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoRecurrenteDto } from './create-movimiento-recurrente.dto';

export class UpdateMovimientoRecurrenteDto extends PartialType(
  CreateMovimientoRecurrenteDto,
) {}