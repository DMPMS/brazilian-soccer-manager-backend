import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTeamglobal1714346677177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.teamglobal (
            id SERIAL NOT NULL,
            country_id INTEGER NOT NULL,
            managerglobal_id INTEGER NOT NULL,
            name character varying NOT NULL,
            src_image character varying NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (country_id) references public.country(id),
            foreign key (managerglobal_id) references public.managerglobal(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.teamglobal;
    `);
  }
}
