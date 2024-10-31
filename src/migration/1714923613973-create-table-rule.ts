import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRule1714923613973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.rule (
            id SERIAL NOT NULL,
            name character varying NOT NULL,
            competition_type integer NOT NULL,
            number_of_teams integer NOT NULL,
            description TEXT NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.rule;
    `);
  }
}
