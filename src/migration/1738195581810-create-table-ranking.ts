import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompetitionsaveRanking1738195581810
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE public.ranking (
          id SERIAL NOT NULL,
          competitionsave_id INTEGER NOT NULL,
          teamsave_id INTEGER NOT NULL,
          points INTEGER NOT NULL,
          played INTEGER NOT NULL,
          wins INTEGER NOT NULL,
          draws INTEGER NOT NULL,
          losses INTEGER NOT NULL,
          goals_for INTEGER NOT NULL,
          goals_against INTEGER NOT NULL,

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
        DROP TABLE public.ranking;
    `);
  }
}
