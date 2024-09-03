import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMatch1725295697071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.match (
            id SERIAL NOT NULL,
            round_id INTEGER NOT NULL,
            teamsave_home_id INTEGER NOT NULL,
            teamsave_away_id INTEGER NOT NULL,
            date TIMESTAMP NOT NULL,
            teamsave_home_goals INTEGER,
            teamsave_away_goals INTEGER,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (round_id) references public.round(id),
            foreign key (teamsave_home_id) references public.teamsave(id),
            foreign key (teamsave_away_id) references public.teamsave(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.match;
    `);
  }
}
