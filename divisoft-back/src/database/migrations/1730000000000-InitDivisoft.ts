import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDivisoft1730000000000 implements MigrationInterface {
  name = 'InitDivisoft1730000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        nombre text NOT NULL UNIQUE,
        descripcion text DEFAULT 'No registra',
        "creadoPorId" uuid,
        "actualizadoPorId" uuid,
        "isActive" boolean NOT NULL DEFAULT true
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "rolId" uuid REFERENCES roles(id),
        documento text UNIQUE,
        nombre text NOT NULL,
        telefono text NOT NULL UNIQUE,
        correo text NOT NULL UNIQUE,
        password text NOT NULL,
        direccion text DEFAULT 'No registra',
        "createAt" timestamp NOT NULL DEFAULT now(),
        "updateAt" timestamp NOT NULL DEFAULT now(),
        "isActive" boolean NOT NULL DEFAULT true
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS consultas (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        nombre text NOT NULL,
        correo text NOT NULL,
        telefono text,
        empresa text,
        proyecto text NOT NULL,
        consentimiento boolean NOT NULL,
        "versionConsentimiento" text NOT NULL DEFAULT 'contact-v1',
        estado text NOT NULL DEFAULT 'nuevo',
        "createAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT consultas_consentimiento_check CHECK (consentimiento = true),
        CONSTRAINT consultas_version_check CHECK ("versionConsentimiento" = 'contact-v1'),
        CONSTRAINT consultas_estado_check CHECK (estado IN ('nuevo', 'contactado', 'en_propuesta', 'cerrado'))
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS consultas`);
    await queryRunner.query(`DROP TABLE IF EXISTS usuarios`);
    await queryRunner.query(`DROP TABLE IF EXISTS roles`);
  }
}
