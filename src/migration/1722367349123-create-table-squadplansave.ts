import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlayersave1722367349123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.squadplansave (
            id SERIAL NOT NULL,
            formation_id INTEGER NOT NULL,
            teamsave_id INTEGER NOT NULL,
            playersave_ids INTEGER[] NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (formation_id) references public.formation(id),
            foreign key (teamsave_id) references public.teamsave(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.squadplansave;
    `);
  }
}
