import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableManagerglobal1712076334929
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.managerglobal (
            id SERIAL NOT NULL,
            country_id INTEGER NOT NULL,
            name character varying NOT NULL,
            birthdate DATE NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,

            primary key (id),
            foreign key (country_id) references public.country(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.managerglobal;
    `);
  }
}
