import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRule1714923613973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.rule (
            id SERIAL NOT NULL,
            country_id integer,
            name character varying NOT NULL,
            level integer NOT NULL,
            number_of_teams integer NOT NULL,
            description TEXT NOT NULL,
            default_competition_name TEXT NOT NULL,
            default_competition_src_image TEXT NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (country_id) references public.country(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.rule;
    `);
  }
}
