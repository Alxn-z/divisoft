import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Usuario } from "../../auth/entities/user.entity";

@Entity("roles")
export class Rol {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  nombre: string;

  @Column("text", { nullable: true, default: "No registra" })
  descripcion: string;


  @ManyToOne(() => Usuario,)
  creadoPor?: Usuario;

  @ManyToOne(() => Usuario,)
  actualizadoPor?: Usuario;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;
}
