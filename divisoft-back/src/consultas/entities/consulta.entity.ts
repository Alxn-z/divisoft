import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text')
  correo: string;

  @Column('text', { nullable: true })
  telefono: string | null;

  @Column('text', { nullable: true })
  empresa: string | null;

  @Column('text')
  proyecto: string;

  @Column('boolean')
  consentimiento: boolean;

  @Column('text', { default: 'contact-v1' })
  versionConsentimiento: string;

  @Column('text', { default: 'nuevo' })
  estado: string;

  @CreateDateColumn()
  createAt: Date;
}
