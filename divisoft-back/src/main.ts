import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  mkdirSync(join(process.cwd(), 'uploads'), { recursive: true });
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const origenes = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origen) => origen.trim())
    .filter(Boolean);
  app.enableCors({ origin: origenes, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Divisoft')
    .setDescription('API de Divisoft: acceso, perfil y consultas de proyecto.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (process.env.STATE !== 'prod') {
    writeFileSync(join(process.cwd(), 'openapi.json'), JSON.stringify(document, null, 2));
  }

  await app.listen(process.env.PORT, '0.0.0.0');

  logger.log(`App corriendo en: ${process.env.HOST_API}/api/v1`);
  logger.log(`Swagger docs en: ${process.env.HOST_API}/docs`);
  logger.log(`Servidor corriendo en: ${process.env.PORT}`);
}
bootstrap();
