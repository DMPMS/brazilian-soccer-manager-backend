import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePlayerglobal1716835107887
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    let players = '';

    for (let i = 0; i < 440; i++) {
      const name = `Jogador ${i + 1}`;
      const age = Math.floor(Math.random() * (35 - 17 + 1)) + 17;
      const overall = Math.floor(Math.random() * (80 - 55 + 1)) + 55;
      const countryId = 29;
      const teamglobalId = Math.floor(i / 11) + 1;

      players += `('${name}', ${age}, ${overall}, ${countryId}, ${teamglobalId})${i < 439 ? ',' : ';'}\n`;
    }

    await queryRunner.query(`
        INSERT INTO public.playerglobal(name, age, overall, country_id, teamglobal_id) VALUES
        ${players}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.playerglobal;
    `);
  }
}
