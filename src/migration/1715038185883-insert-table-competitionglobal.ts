import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableCompetitionglobal1715038185883
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.competitionglobal(name, season, src_image, rule_id, country_id) VALUES
        ('Campeonato Brasileiro Série A', '2024', 'https://i.ibb.co/cC2zm5q/brasileirao.png', 1, 29);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.competitionglobal;
    `);
  }
}
