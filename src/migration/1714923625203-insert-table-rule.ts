import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableRule1714923625203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.rule(name, competition_type, number_of_teams, yellow_cards_max) VALUES
        ('Liga 1', 1, 20, 3),
        ('Liga 2', 1, 18, 3),
        ('Liga 3', 1, 16, 3),
        ('Copa 1', 2, 32, 2),
        ('Copa 2', 2, 32, 3);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.rule;
    `);
  }
}
