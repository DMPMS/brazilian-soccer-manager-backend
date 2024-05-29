import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePlayerglobalPosition1717011210641
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    let inserts = '';

    const positionIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    for (let i = 0; i < 220; i++) {
      const shuffledPositionIds = positionIds.sort(() => 0.5 - Math.random());

      const playerPositions = new Set<{ positionId: number; rating: number }>();

      // If the first position is goalkeeper, the player can only have this primary position.
      if (shuffledPositionIds[0] === 13) {
        playerPositions.add({
          positionId: 13,
          rating: 1.0,
        });
      } else {
        const filteredPositionIds = shuffledPositionIds.filter(
          (positionId) => positionId !== 13,
        );

        const primaryPositionsCount = Math.floor(Math.random() * 3) + 1;
        const secondaryPositionsCount = Math.floor(Math.random() * 6);

        for (let j = 0; j < primaryPositionsCount; j++) {
          playerPositions.add({
            positionId: filteredPositionIds[j],
            rating: 1.0,
          });
        }

        for (
          let j = primaryPositionsCount;
          j < primaryPositionsCount + secondaryPositionsCount;
          j++
        ) {
          playerPositions.add({
            positionId: filteredPositionIds[j],
            rating: 0.95,
          });
        }
      }

      playerPositions.forEach((playerPosition) => {
        inserts += `(${i + 1}, ${playerPosition.positionId}, ${playerPosition.rating}),\n`;
      });
    }

    inserts = inserts.slice(0, -2) + ';';

    await queryRunner.query(`
        INSERT INTO public.playerglobal_position(playerglobal_id, position_id, rating) VALUES
        ${inserts}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DELETE FROM public.playerglobal_position;
    `);
  }
}
