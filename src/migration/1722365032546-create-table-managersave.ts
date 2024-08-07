import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableManagersave1722365032546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.managersave (
            id SERIAL NOT NULL,
            save_id INTEGER NOT NULL,
            managerglobal_id INTEGER,
            country_id INTEGER NOT NULL,
            name character varying NOT NULL,
            birthdate DATE NOT NULL,

            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            
            primary key (id),
            foreign key (save_id) references public.save(id),
            foreign key (managerglobal_id) references public.managerglobal(id) ON DELETE SET NULL,
            foreign key (country_id) references public.country(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.managersave;
    `);
  }
}
