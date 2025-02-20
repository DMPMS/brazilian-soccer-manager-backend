import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFormation1714346677175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.formation (
            id SERIAL NOT NULL,
            name character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.formation;
    `);
  }
}
