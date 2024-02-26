import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSave1707492241875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.save (
            id SERIAL NOT NULL,
            user_id INTEGER NOT NULL,
            name character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (user_id) references public.user(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.save;
    `);
  }
}
