import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlayerglobalPosition1716994898724
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.playerglobal_position (
            id SERIAL NOT NULL,
            playerglobal_id integer NOT NULL,
            position_id integer NOT NULL,
            rating decimal(3,2) NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (playerglobal_id) references public.playerglobal(id),
            foreign key (position_id) references public.position(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.playerglobal_position;
    `);
  }
}
