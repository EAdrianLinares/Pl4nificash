/* eslint-disable prettier/prettier */
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Usuarios } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Movimiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: ['INGRESO', 'GASTO'],
  })
  tipo!: 'INGRESO' | 'GASTO';

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
