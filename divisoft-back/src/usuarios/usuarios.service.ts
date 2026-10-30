import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "src/auth/dto/update-user.dto";
import { UpdatePerfilDto } from "src/auth/dto/update-perfil.dto";
import { Usuario } from "src/auth/entities/user.entity";
import { paginate } from "src/common/helpers/pagination.helper";
import { handleCustomError } from "src/functions/error";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Rol } from "src/rols/entities/rol.entity";

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ) {}

  perfilPropio(user: Usuario) {
    return {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      telefono: user.telefono,
      direccion: user.direccion,
      documento: user.documento ?? null,
      rol: user.rol ? { id: user.rol.id, nombre: user.rol.nombre } : null,
    };
  }

  actualizarPropio(id: string, dto: UpdatePerfilDto) {
    return this.update(id, dto);
  }

  async findAll(page = 1, limit = 10) {
    console.log("paso por aqui");
    try {
      const [usuarios, total] = await this.usuarioRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: ["rol"],
      });

      const transformedUsuarios = usuarios.map((usuario) => ({
        id: usuario.id,
        documento: usuario.documento,
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        correo: usuario.correo,
        direccion: usuario.direccion,
        createAt: usuario.createAt,
        updateAt: usuario.updateAt,
        isActive: usuario.isActive,
        rol: usuario.rol
          ? { id: usuario.rol.id, nombre: usuario.rol.nombre }
          : null,
        creadoPor: usuario.nombre
          ? { id: usuario.id, nombre: usuario.nombre }
          : null,
        actualizadoPor: usuario.nombre
          ? { id: usuario.id, nombre: usuario.nombre }
          : null,
      }));

      return paginate(transformedUsuarios, total, page, limit);
    } catch (error) {
      console.log(error);
      throw handleCustomError(error);
    }
  }

  async findOne(id: string): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ["rol"],
      });
      if (!usuario) {
        throw new BadRequestException(`Usuario no registrado o inactivo`);
      }
      if (!usuario.isActive) {
        throw new BadRequestException("El usuario esta desactivado");
      }
      return usuario;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`No se encontro el ID: ${id}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ["rol"],
      });
      if (!usuario) {
        throw new NotFoundException("Usuario no encontrado");
      }

      // Validar correo si se va a actualizar
      if (updateUserDto.correo && updateUserDto.correo !== usuario.correo) {
        const correoExistente = await this.usuarioRepository.findOne({
          where: { correo: updateUserDto.correo },
        });
        if (correoExistente && correoExistente.id !== id) {
          throw new BadRequestException("El correo ya está registrado");
        }
      }

      // Validar teléfono si se va a actualizar
      if (
        updateUserDto.telefono &&
        updateUserDto.telefono !== usuario.telefono
      ) {
        const telefonoExistente = await this.usuarioRepository.findOne({
          where: { telefono: updateUserDto.telefono },
        });
        if (telefonoExistente && telefonoExistente.id !== id) {
          throw new BadRequestException("El teléfono ya está registrado");
        }
      }

      // Validar documento si se va a actualizar
      if (
        updateUserDto.documento &&
        updateUserDto.documento !== usuario.documento
      ) {
        const documentoExistente = await this.usuarioRepository.findOne({
          where: { documento: updateUserDto.documento },
        });
        if (documentoExistente && documentoExistente.id !== id) {
          throw new BadRequestException("El documento ya está registrado");
        }
      }

      // Encriptar la contraseña si se va a actualizar
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Asignar rol si viene en el DTO
      if (updateUserDto.rolId) {
        const rol = await this.rolRepository.findOne({
          where: { id: updateUserDto.rolId },
        });
        if (!rol) {
          throw new BadRequestException("El rol especificado no existe");
        }
        usuario.rol = rol;
        delete updateUserDto.rolId;
      }
      // Actualizar el usuario
      const { rolId, ...dtoSinRolId } = updateUserDto;
      const usuarioActualizado = this.usuarioRepository.merge(
        usuario,
        dtoSinRolId
      );
      await this.usuarioRepository.save(usuarioActualizado);

      // No retornar la contraseña en la respuesta
      const { password, ...userWithoutPassword } = usuarioActualizado;
      return userWithoutPassword as Usuario;
    } catch (error) {
      throw handleCustomError(error);
    }
  }

  async desactivar(id: string) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });

      if (!usuario) {
        throw new BadRequestException("El usuario no existe");
      }

      await this.usuarioRepository.update(id, { isActive: !usuario.isActive });

      const estadoActualizado = usuario.isActive ? "desactivado" : "activado";
      return { mensaje: `Usuario ${estadoActualizado} correctamente` };
    } catch (error) {
      console.error(error);
      throw handleCustomError(error);
    }
  }
}
