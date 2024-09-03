import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRound1725295434060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.round (
            id SERIAL NOT NULL,
            competitionsave_id INTEGER NOT NULL,
            name character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (competitionsave_id) references public.competitionsave(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.round;
    `);
  }
}
