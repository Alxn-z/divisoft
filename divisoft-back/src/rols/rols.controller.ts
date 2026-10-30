import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { RolsService } from "./rols.service";
import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorator/auth.decorator";
import { GetUser } from "src/auth/decorator/get-user.decorator";
import { Usuario } from "src/auth/entities/user.entity";

@ApiTags("Roles")
@Controller("rols")
export class RolsController {
  constructor(private readonly rolsService: RolsService) {}

  @Post()
  @Auth('Admin')
  create(@Body() createRolDto: CreateRolDto, @GetUser() user: Usuario) {
    return this.rolsService.create(createRolDto, user);
  }

  @Post("false")
  createFalseOne(@Body() createRolDto: CreateRolDto) {
    return this.rolsService.createFalseOne(createRolDto);
  }

  @Get()
  @Auth('Admin')
  findAll(@Query("page") page?: number, @Query("limit") limit?: number) {
    return this.rolsService.findAll(page, limit);
  }

  @Get(":id")
  @Auth('Admin')
  findOne(@Param("id") id: string) {
    return this.rolsService.findOne(id);
  }

  @Patch(":id")
  @Auth("Admin")
  update(
    @Param("id") id: string,
    @Body() updateRolDto: UpdateRolDto,
    @GetUser() user: Usuario
  ) {
    return this.rolsService.update(id, updateRolDto, user);
  }

  @Delete(":id")
  @Auth("Admin")
  remove(@Param("id") id: string) {
    return this.rolsService.remove(id);
  }

  @Patch(':id/deactivate')
  @Auth('Admin')
  deactivate(@Param('id') id: string, @GetUser() user: Usuario) {
    return this.rolsService.deactivate(id, user);
  }
}
