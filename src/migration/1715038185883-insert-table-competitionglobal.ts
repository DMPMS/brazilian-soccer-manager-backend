import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableCompetitionglobal1715038185883
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.competitionglobal(name, season, level, src_image, rule_id, country_id) VALUES
        ('Brasileirão', '2024', 'CompetitionglobalNationalEntity', 'https://i.ibb.co/cC2zm5q/brasileirao.png', 1, 29),
        ('Copa do Brasil', '2024', 'CompetitionglobalNationalEntity', 'https://i.ibb.co/B2fgSLQ/copa-do-brasil.png', 5, 29);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.competitionglobal;
    `);
  }
}
