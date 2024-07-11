import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1707491422107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.user (
            id SERIAL NOT NULL,
            country_id INTEGER NOT NULL,
            name character varying NOT NULL,
            user_type integer NOT NULL,
            age INTEGER NOT NULL,
            email character varying NOT NULL,
            password character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            unique(email)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.user;
    `);
  }
}
