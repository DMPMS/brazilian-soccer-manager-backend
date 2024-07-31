import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlayersavePosition1722436225594
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.playersave_position (
            id SERIAL NOT NULL,
            playersave_id integer NOT NULL,
            position_id integer NOT NULL,
            rating decimal(3,2) NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (playersave_id) references public.playersave(id),
            foreign key (position_id) references public.position(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.playersave_position;
    `);
  }
}
