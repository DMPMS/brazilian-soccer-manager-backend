import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlayerglobal1716835096373
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.playerglobal (
            id SERIAL NOT NULL,
            country_id INTEGER NOT NULL,
            teamglobal_id INTEGER,
            name character varying NOT NULL,
            age INTEGER NOT NULL,
            overall INTEGER NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (country_id) references public.country(id),
            foreign key (teamglobal_id) references public.teamglobal(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.playerglobal;
    `);
  }
}
