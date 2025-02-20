import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTableSquadplanglobal1714668069287
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    let squadplans = '';

    for (let i = 0; i < 68; i++) {
      const formationId = Math.floor(Math.random() * 5) + 1;
      const teamglobalId = i + 1;

      const firstPlayerglobalId = (teamglobalId - 1) * 11 + 1;
      const playerglobalIds = Array.from(
        { length: 11 },
        (_, j) => firstPlayerglobalId + j,
      );

      squadplans += `(${formationId}, ${teamglobalId}, '{${playerglobalIds.join(',')}}')${i < 67 ? ',' : ';'}\n`;
    }

    await queryRunner.query(`
        INSERT INTO public.squadplanglobal(formation_id, teamglobal_id, playerglobal_ids) VALUES
        ${squadplans}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.squadplanglobal;
    `);
  }
}
