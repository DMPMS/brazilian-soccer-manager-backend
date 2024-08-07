import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddControllerManagersaveIdColumnTableSave1722992948141
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.save
        ADD COLUMN controller_managersave_id INTEGER,
        ADD CONSTRAINT save_managersave FOREIGN KEY (controller_managersave_id) REFERENCES public.managersave(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.save
        DROP CONSTRAINT save_managersave,
        DROP COLUMN controller_managersave_id;
    `);
  }
}
