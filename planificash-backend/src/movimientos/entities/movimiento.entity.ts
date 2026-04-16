import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Usuarios } from '../../usuarios/entities/usuario.entity';
import { TipoMovimiento, CategoriaMovimiento } from '../enum/movement.enum';

@Entity()
export class Movimiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: TipoMovimiento,
  })
  tipo!: TipoMovimiento;

  @Column({
    type: 'enum',
    enum: CategoriaMovimiento,
  })
  categoria!: CategoriaMovimiento;

  @Column('decimal', { precision: 10, scale: 2 })
  valor!: number;

  @Column()
  descripcion!: string;

  @Column({ type: 'date' })
  fecha!: Date;

  @ManyToOne(() => Usuarios, (usuario) => usuario.movimientos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  usuario!: Usuarios;
}
