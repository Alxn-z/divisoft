import { Module } from '@nestjs/common';
import { RolsService } from './rols.service';
import { RolsController } from './rols.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Usuario } from 'src/auth/entities/user.entity';


@Module({
  controllers: [RolsController],
  providers: [RolsService],
  imports:[
    TypeOrmModule.forFeature([Rol, Usuario]),
    AuthModule,
  ],
  exports: [
    TypeOrmModule, RolsService
  ]
})
export class RolsModule {}
