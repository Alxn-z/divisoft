import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
} from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { UpdateUserDto } from "src/auth/dto/update-user.dto";
import { UpdatePerfilDto } from "src/auth/dto/update-perfil.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Usuario } from "src/auth/entities/user.entity";
import { Auth } from "src/auth/decorator/auth.decorator";
import { GetUser } from "src/auth/decorator/get-user.decorator";

@ApiTags("usuarios")
@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('me')
  @Auth()
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Perfil de la persona autenticada' })
  perfil(@GetUser() user: Usuario) {
    return this.usuariosService.perfilPropio(user);
  }

  @Patch('me')
  @Auth()
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Actualiza el perfil propio, sin cambiar el rol' })
  actualizarPerfil(@GetUser() user: Usuario, @Body() dto: UpdatePerfilDto) {
    return this.usuariosService.actualizarPropio(user.id, dto);
  }

  @Get("")
  @Auth('Admin')
  @ApiOperation({ summary: 'Obtener todos los usuario' })
  findAll(@Query("page") page?: number, @Query("limit") limit?: number) {
    return this.usuariosService.findAll(page, limit);
  }

  @Get("/:id")
  @Auth('Admin')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  findOne(@Param("id") id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch("/:id")
  @Auth('Admin')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  update(@Param("id") id: string, @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Patch("desactivar/:id")
  @Auth('Admin')
  @ApiOperation({ summary: 'Desactiva un usuario' })
  desactivar(@Param("id") id: string) {
    return this.usuariosService.desactivar(id);
  }

}
