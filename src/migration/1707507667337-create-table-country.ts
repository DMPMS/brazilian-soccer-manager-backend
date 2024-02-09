import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCountry1707507667337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.country (
            id SERIAL NOT NULL,
            name character varying NOT NULL,
            srcImage character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.country;
    `);
  }
}
