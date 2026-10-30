import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SeedModule } from './seed/seed.module';
import { RolsModule } from './rols/rols.module';
import { CommonModule } from './common/common.module';
import { ConsultasModule } from './consultas/consultas.module';
import { InitDivisoft1730000000000 } from './database/migrations/1730000000000-InitDivisoft';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: { index: false },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PD_HOST,
      port: +process.env.PD_PORT,
      username: process.env.PD_USERNAME,
      password: process.env.PD_PASSWORD,
      database: process.env.PD_NAMEDB,
      autoLoadEntities: true,
      synchronize: false,
      migrations: [InitDivisoft1730000000000],
      migrationsRun: true,
    }),
    CommonModule,
    AuthModule,
    UsuariosModule,
    SeedModule,
    RolsModule,
    ConsultasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
