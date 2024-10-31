import {
  PLAYERGLOBAL_MAX_AGE,
  PLAYERGLOBAL_MIN_AGE,
} from 'src/utils/constants/dtoValidators';
import { CURRENT_DATE_UTC } from 'src/utils/constants/others';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePlayerglobal1716835107887
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    let players = '';

    const currentYear = CURRENT_DATE_UTC.year();

    for (let i = 0; i < 748; i++) {
      const name = `Jogador ${i + 1}`;

      const minYear = currentYear - PLAYERGLOBAL_MAX_AGE;
      const maxYear = currentYear - PLAYERGLOBAL_MIN_AGE;
      const birthYear =
        Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
      const birthMonth = Math.floor(Math.random() * 12) + 1;
      const birthDay = Math.floor(Math.random() * 28) + 1;

      const birthDate = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

      const overall = Math.floor(Math.random() * (80 - 55 + 1)) + 55;
      const countryId = 29;
      const teamglobalId = Math.floor(i / 11) + 1;

      players += `('${name}', '${birthDate}', ${overall}, ${countryId}, ${teamglobalId})${i < 747 ? ',' : ';'}\n`;
    }

    await queryRunner.query(`
        INSERT INTO public.playerglobal(name, birthdate, overall, country_id, teamglobal_id) VALUES
        ${players}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.playerglobal;
    `);
  }
}
