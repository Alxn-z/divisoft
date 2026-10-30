import { Controller, Get, INestApplication, Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AllExceptionsFilter } from './../src/common/filters/http-exception.filter';
import { ResponseInterceptor } from './../src/common/interceptors/response.interceptor';

@Controller()
class ProbeController {
  @Get('salud')
  salud() {
    return { servicio: 'divisoft' };
  }
}

@Module({ controllers: [ProbeController] })
class ProbeModule {}

describe('Sobre de respuesta (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProbeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /api/v1/salud envuelve el dato', () => {
    return request(app.getHttpServer())
      .get('/api/v1/salud')
      .expect(200)
      .expect({ ok: true, data: { servicio: 'divisoft' }, msg: null });
  });

  it('GET / queda fuera del prefijo', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });
});
