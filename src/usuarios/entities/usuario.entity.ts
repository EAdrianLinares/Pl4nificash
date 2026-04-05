/* eslint-disable prettier/prettier */
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Movimiento } from '../../movimientos/entities/movimiento.entity';

@Entity()
export class Usuarios {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre!: string; 

    @Column({unique:true})
    email!: string;

    @Column()
    password!: string;

    @OneToMany(()=> Movimiento, movimientos => movimientos.usuario)
    movimientos!: Movimiento[];

}
