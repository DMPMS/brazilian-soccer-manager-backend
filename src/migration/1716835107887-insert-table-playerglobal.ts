import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePlayerglobal1716835107887
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.playerglobal(id, name, age, overall, country_id, teamglobal_id) VALUES
        (1, 'Jogador 1', 25, 75, 29, NULL),
        (2, 'Jogador 2', 20, 70, 29, 3);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.playerglobal;
    `);
  }
}
