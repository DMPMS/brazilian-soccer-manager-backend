import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlayersave1722432015379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.playersave (
            id SERIAL NOT NULL,
            save_id INTEGER NOT NULL,
            playerglobal_id INTEGER,
            country_id INTEGER NOT NULL,
            teamsave_id INTEGER,
            name character varying NOT NULL,
            birthdate DATE NOT NULL,
            overall INTEGER NOT NULL,
            stamina INTEGER NOT NULL,
            morale INTEGER NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (save_id) references public.save(id),
            foreign key (playerglobal_id) references public.playerglobal(id) ON DELETE SET NULL,
            foreign key (country_id) references public.country(id),
            foreign key (teamsave_id) references public.teamsave(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.playersave;
    `);
  }
}
