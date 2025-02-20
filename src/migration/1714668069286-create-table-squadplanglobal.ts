import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSquadplanglobal1714668069286
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.squadplanglobal (
            id SERIAL NOT NULL,
            formation_id INTEGER NOT NULL,
            teamglobal_id INTEGER NOT NULL,
            playerglobal_ids INTEGER[] NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (formation_id) references public.formation(id),
            foreign key (teamglobal_id) references public.teamglobal(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.squadplanglobal;
    `);
  }
}
