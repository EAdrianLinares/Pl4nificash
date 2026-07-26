import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Movimiento } from '../../movimientos/entities/movimiento.entity';
import { MovimientoRecurrente } from '../../movimientos-recurrentes/entities/movimiento-recurrente.entity';

@Entity('profiles')
export class Usuarios {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ type: 'text' })
  nombre!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => Movimiento, (movimiento) => movimiento.usuario)
  movimientos!: Movimiento[];

  @OneToMany(
    () => MovimientoRecurrente,
    (movimientoRecurrente) => movimientoRecurrente.usuario,
  )
  movimientosRecurrentes!: MovimientoRecurrente[];
}
