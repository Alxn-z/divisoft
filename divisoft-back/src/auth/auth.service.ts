import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entities/user.entity";
import { Repository } from "typeorm";
import { handleCustomError } from "src/functions/error";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtPayload } from "./interfaces/jwt-payload";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Rol } from "src/rols/entities/rol.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly authRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    private readonly jwtService: JwtService
  ) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { correo, password } = loginUserDto;

      const user = await this.authRepository.findOne({
        where: { correo },
        select: {
          id: true,
          correo: true,
          rol: true,
          nombre: true,
          isActive: true,
          password: true,
        },
        relations: ["rol"],
      });

      if (!user) {
        throw new BadRequestException("No existe un usuario con este correo");
      }

      if (!user.isActive) {
        throw new BadRequestException(
          "Usuario desactivado, comunícate con el administrador"
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException("Credenciales incorrectas");
      }

      return {
        token: this.getJwtToken({ id: user.id }),
        user: {
          id: user.id,
          correo: user.correo,
          nombre: user.nombre,
          rol: user.rol,
        },
      };
    } catch (error) {
      console.log(error);
      throw handleCustomError(error);
    }
  }

  async checkAuthStatus(user: Usuario) {
    const { id } = user;
    const token = this.getJwtToken({ id });
    return {
      ok: true,
      id,
      token,
      user,
    };
  }

  async create(
    createUserDto: CreateUserDto
  ): Promise<{ token: string; user: Partial<Usuario> }> {
    try {
      const { correo, telefono, documento, password, nombre, direccion } = createUserDto;
      const documentoLimpio = documento?.trim() || null;

      const correoExistente = await this.authRepository.findOne({
        where: { correo },
      });
      if (correoExistente) {
        throw new BadRequestException("El correo ya está registrado");
      }

      const telefonoExistente = await this.authRepository.findOne({
        where: { telefono },
      });
      if (telefonoExistente) {
        throw new BadRequestException("El teléfono ya está registrado");
      }

      if (documentoLimpio) {
        const documentoExistente = await this.authRepository.findOne({
          where: { documento: documentoLimpio },
        });
        if (documentoExistente) {
          throw new BadRequestException("El documento ya está registrado");
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const rol = await this.rolRepository.findOne({
        where: { nombre: "Usuario", isActive: true },
      });
      if (!rol) {
        throw new InternalServerErrorException("El rol Usuario no está configurado");
      }

      const user = this.authRepository.create({
        nombre,
        correo,
        telefono,
        direccion,
        documento: documentoLimpio,
        password: hashedPassword,
        rol,
        isActive: true,
      });

      await this.authRepository.save(user);

      // Generar el token JWT
      const token = this.getJwtToken({ id: user.id });

      // Retornar solo los campos deseados del usuario, excluyendo la contraseña
      const userResponse = {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre,
        rol: user.rol,
      };

      return {
        token,
        user: userResponse,
      };
    } catch (error) {
      console.log(error);
      throw handleCustomError(error);
    }
  }
}
