import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompetititionglobalTeamglobal1715886605026
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.competitionglobal_teamglobal (
            id SERIAL NOT NULL,
            competitionglobal_id integer NOT NULL,
            teamglobal_id integer NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (competitionglobal_id) references public.competitionglobal(id),
            foreign key (teamglobal_id) references public.teamglobal(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.competitionglobal_teamglobal;
    `);
  }
}
