import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompetitionsave1722443937732
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.competitionsave (
            id SERIAL NOT NULL,
            save_id INTEGER NOT NULL,
            competitionglobal_id INTEGER,
            rule_id integer NOT NULL,
            name character varying NOT NULL,
            season character varying NOT NULL,
            src_image character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (save_id) references public.save(id),
            foreign key (competitionglobal_id) references public.competitionglobal(id) ON DELETE SET NULL,
            foreign key (rule_id) references public.rule(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.competitionsave;
    `);
  }
}
