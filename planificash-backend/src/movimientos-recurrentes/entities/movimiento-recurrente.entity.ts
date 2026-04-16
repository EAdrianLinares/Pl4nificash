import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoMovimiento } from '../enums/tipo-movimientos.enum';

@Entity('movimientos_recurrentes')
export class MovimientoRecurrente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column({
    type: 'enum',
    enum: TipoMovimiento
  })
  tipo: TipoMovimiento;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ default: true })
  activo: boolean;
}