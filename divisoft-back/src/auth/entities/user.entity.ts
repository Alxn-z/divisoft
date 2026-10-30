import { Rol } from 'src/rols/entities/rol.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Rol, { eager: true, nullable: true })
  rol: Rol;
  
  @Column('text', { unique: true, nullable: true })
  documento?: string | null;

  @Column('text')
  nombre: string;

  @Column('text', { unique: true, default: 'No registra' })
  telefono: string;

  @Column('text', { unique: true })
  correo: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true, default: 'No registra' })
  direccion: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;

}
