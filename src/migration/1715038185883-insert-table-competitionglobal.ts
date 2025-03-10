import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableCompetitionglobal1715038185883
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.competitionglobal(name, season, src_image, rule_id) VALUES
        ('Brasileirão Série A', '2024', 'https://i.ibb.co/gynW091/brazil-league-a.png', 1),
        ('Brasileirão Série B', '2024', 'https://i.ibb.co/MPLsZ0q/brazil-league-b.png', 2),
        ('Brasileirão Série C', '2024', 'https://i.ibb.co/DY16F97/brazil-league-c.png', 3),
        ('Brasileirão Série D', '2024', 'https://i.ibb.co/RP9DVCc/brazil-league-d.png', 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.competitionglobal;
    `);
  }
}
