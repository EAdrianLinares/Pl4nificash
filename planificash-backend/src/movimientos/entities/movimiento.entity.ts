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

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => Usuarios, (usuario) => usuario.movimientos, {
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

  @Column({ type: 'date' })
  fecha!: Date;

  @Column({ type: 'text', nullable: true })
  categoria!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
