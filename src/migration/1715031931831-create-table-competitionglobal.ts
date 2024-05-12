import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompetitionglobal1715031931831
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.competitionglobal (
            id SERIAL NOT NULL,
            rule_id integer NOT NULL,
            country_id integer,
            name character varying NOT NULL,
            season character varying NOT NULL,
            src_image character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (rule_id) references public.rule(id),
            foreign key (country_id) references public.country(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.competitionglobal;
    `);
  }
}
