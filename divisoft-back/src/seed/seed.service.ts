import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from 'src/rols/entities/rol.entity';

const ROLES_BASE = [
  { nombre: 'Usuario', descripcion: 'Cuenta de Divisoft' },
  { nombre: 'Admin', descripcion: 'Administración de Divisoft' },
];

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async onModuleInit() {
    for (const rol of ROLES_BASE) {
      const exists = await this.rolRepository.findOne({ where: { nombre: rol.nombre } });
      if (!exists) {
        await this.rolRepository.save(this.rolRepository.create(rol));
      }
    }
  }

  async estado() {
    const roles = await this.rolRepository.find({ order: { nombre: 'ASC' } });
    return {
      roles: roles.map((rol) => ({ id: rol.id, nombre: rol.nombre, isActive: rol.isActive })),
    };
  }
}
