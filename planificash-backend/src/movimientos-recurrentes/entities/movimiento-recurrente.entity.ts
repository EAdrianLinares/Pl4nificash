import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Usuarios } from '../../usuarios/entities/usuario.entity';

@Entity('movimientos_recurrentes')
export class MovimientoRecurrente {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => Usuarios, (usuario) => usuario.movimientosRecurrentes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  usuario!: Usuarios;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  monto!: string;

  @Column({ type: 'text' })
  tipo!: string;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({ type: 'text' })
  frecuencia!: string;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio!: Date;

  @Column({ name: 'proxima_fecha', type: 'date' })
  proximaFecha!: Date;

  @Column({ name: 'fecha_fin', type: 'date', nullable: true })
  fechaFin!: Date | null;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ type: 'text', nullable: true })
  categoria!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
