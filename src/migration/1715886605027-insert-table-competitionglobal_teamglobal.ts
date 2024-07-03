import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableCompetitionglobalTeamglobal1715886605027
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        INSERT INTO public.competitionglobal_teamglobal(competitionglobal_id, teamglobal_id) VALUES
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (1, 5),
        (1, 6),
        (1, 7),
        (1, 8),
        (1, 9),
        (1, 10),
        (1, 11),
        (1, 12),
        (1, 13),
        (1, 14),
        (1, 15),
        (1, 16),
        (1, 17),
        (1, 18),
        (1, 19),
        (1, 20),
        (2, 21),
        (2, 22),
        (2, 23),
        (2, 24),
        (2, 25),
        (2, 26),
        (2, 27),
        (2, 28),
        (2, 29),
        (2, 30),
        (2, 31),
        (2, 32),
        (2, 33),
        (2, 34),
        (2, 35),
        (2, 36),
        (2, 37),
        (2, 38),
        (2, 39),
        (2, 40),
        (3, 1),
        (3, 2),
        (3, 3),
        (3, 4),
        (3, 5),
        (3, 6),
        (3, 7),
        (3, 8),
        (3, 9),
        (3, 10),
        (3, 11),
        (3, 12),
        (3, 13),
        (3, 14),
        (3, 15),
        (3, 16),
        (3, 17),
        (3, 18),
        (3, 19),
        (3, 20),
        (3, 21),
        (3, 22),
        (3, 23),
        (3, 24),
        (3, 25),
        (3, 26),
        (3, 27),
        (3, 28),
        (3, 29),
        (3, 30),
        (3, 31),
        (3, 32);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.competitionglobal_teamglobal;
    `);
  }
}
