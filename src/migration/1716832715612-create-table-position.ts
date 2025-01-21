import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePosition1716832715612 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.position (
            id SERIAL NOT NULL,
            name character varying NOT NULL,
            abbreviation character varying NOT NULL,
            area INTEGER NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.position;
    `);
  }
}
