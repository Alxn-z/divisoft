import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";
import { Rol } from "./entities/rol.entity";
import { Usuario } from "../auth/entities/user.entity";
import { handleCustomError } from "src/functions/error";
import { paginate } from "src/common/helpers/pagination.helper";

@Injectable()
export class RolsService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ) {}

  async create(createRolDto: CreateRolDto, user: Usuario) {
    try {
      const { nombre, descripcion } = createRolDto;

      const exists = await this.rolRepository.findOne({ where: { nombre } });
      if (exists)
        throw new BadRequestException("Ya existe un rol con ese nombre");

      const rol = this.rolRepository.create({
        nombre,
        descripcion,
        creadoPor: user,
      });

      await this.rolRepository.save(rol);
      return {
        id: rol.id,
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        isActive: rol.isActive,
        creadoPor: {
          id: user.id,
          nombre: user.nombre,
        },
      };
    } catch (error) {
      console.log(error);
      throw handleCustomError(error);
    }
  }
  async createFalseOne(createRolDto: CreateRolDto) {
    try {
      const { nombre, descripcion } = createRolDto;

      const exists = await this.rolRepository.findOne({ where: { nombre } });
      if (exists)
        throw new BadRequestException("Ya existe un rol con ese nombre");

      const rol = this.rolRepository.create({
        nombre,
        descripcion,        
      });

      await this.rolRepository.save(rol);
      return {
        id: rol.id,
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        isActive: rol.isActive,
       
      };
    } catch (error) {
      console.log(error);
      throw handleCustomError(error);
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const [roles, total] = await this.rolRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ["creadoPor", "actualizadoPor"],
      });
      const transformedRoles = roles.map((rol) => ({
        id: rol.id,
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        isActive: rol.isActive,
        creadoPor: rol.creadoPor
          ? { id: rol.creadoPor.id, nombre: rol.creadoPor.nombre }
          : null,
        actualizadoPor: rol.actualizadoPor
          ? { id: rol.actualizadoPor.id, nombre: rol.actualizadoPor.nombre }
          : null,
      }));
      return paginate(transformedRoles, total, page, limit);
    } catch (error) {
      console.log(error);
      throw handleCustomError(error);
    }
  }

  async findOne(id: string) {
    try {
      const rol = await this.rolRepository.findOne({
        where: { id },
        relations: ["creadoPor", "actualizadoPor"],
      });
      if (!rol) throw new NotFoundException("Rol no encontrado");
      return {
        id: rol.id,
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        isActive: rol.isActive,
        creadoPor: rol.creadoPor
          ? { id: rol.creadoPor.id, nombre: rol.creadoPor.nombre }
          : null,
        actualizadoPor: rol.actualizadoPor
          ? { id: rol.actualizadoPor.id, nombre: rol.actualizadoPor.nombre }
          : null,
      };
    } catch (error) {
      throw handleCustomError(error);
    }
  }

  async update(id: string, updateRolDto: UpdateRolDto, user: Usuario) {
    try {
      const rol = await this.rolRepository.findOne({
        where: { id },
        relations: ["creadoPor", "actualizadoPor"],
      });
      if (!rol) throw new NotFoundException("Rol no encontrado");

      if (updateRolDto.nombre && updateRolDto.nombre !== rol.nombre) {
        const exists = await this.rolRepository.findOne({
          where: { nombre: updateRolDto.nombre },
        });
        if (exists)
          throw new BadRequestException("Ya existe un rol con ese nombre");
      }

      if (updateRolDto.nombre) rol.nombre = updateRolDto.nombre;
      if (updateRolDto.descripcion) rol.descripcion = updateRolDto.descripcion;
      rol.actualizadoPor = user;
      await this.rolRepository.save(rol);
      return {
        id: rol.id,
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        isActive: rol.isActive,
        creadoPor: rol.creadoPor
          ? { id: rol.creadoPor.id, nombre: rol.creadoPor.nombre }
          : null,
        actualizadoPor: {
          id: user.id,
          nombre: user.nombre,
        },
      };
    } catch (error) {
      throw handleCustomError(error);
    }
  }

  async remove(id: string) {
    try {
      const rol = await this.rolRepository.findOne({ where: { id } });
      if (!rol) throw new NotFoundException("Rol no encontrado");
      await this.rolRepository.remove(rol);
      return { message: "Rol eliminado correctamente" };
    } catch (error) {
      throw handleCustomError(error);
    }
  }

  async deactivate(id: string, user: Usuario) {
  try {
    const rol = await this.rolRepository.findOne({
      where: { id },
      relations: ['creadoPor', 'actualizadoPor'],
    });
    if (!rol) throw new NotFoundException('Rol no encontrado');

    rol.isActive = false;
    rol.actualizadoPor = user; 

    const updatedRol = await this.rolRepository.save(rol);

    return {
        id: updatedRol.id,
        nombre: updatedRol.nombre,
        descripcion: updatedRol.descripcion,
        isActive: updatedRol.isActive,
        creadoPor: updatedRol.creadoPor
          ? { id: updatedRol.creadoPor.id, nombre: updatedRol.creadoPor.nombre }
          : null,
        actualizadoPor: updatedRol.actualizadoPor
          ? { id: updatedRol.actualizadoPor.id, nombre: updatedRol.actualizadoPor.nombre }
          : null,
    };
  } catch (error) {
    console.log(error)
    throw handleCustomError(error);
  }
}
}
