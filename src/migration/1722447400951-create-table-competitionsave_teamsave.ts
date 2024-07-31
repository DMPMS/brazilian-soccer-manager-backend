import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompetitionsaveTeamsave1722447400951
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.competitionsave_teamsave (
            id SERIAL NOT NULL,
            competitionsave_id integer NOT NULL,
            teamsave_id integer NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (competitionsave_id) references public.competitionsave(id),
            foreign key (teamsave_id) references public.teamsave(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.competitionsave_teamsave;
    `);
  }
}
