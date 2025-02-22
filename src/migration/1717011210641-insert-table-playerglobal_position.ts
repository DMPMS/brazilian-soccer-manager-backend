import { PositionEnum } from 'src/shared/enums/Position.enum';
import { PositionRatingEnum } from 'src/shared/enums/PositionRating.enum';
import {
  PLAYERGLOBAL_MAX_PRIMARY_POSITIONS,
  PLAYERGLOBAL_MAX_SECONDARY_POSITIONS,
} from 'src/utils/constants/dtoValidators';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTablePlayerglobalPosition1717011210641
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    let inserts = '';

    const positionIds = [
      PositionEnum.CF,
      PositionEnum.SS,
      PositionEnum.LW,
      PositionEnum.RW,
      PositionEnum.AM,
      PositionEnum.LM,
      PositionEnum.RM,
      PositionEnum.CM,
      PositionEnum.DM,
      PositionEnum.LB,
      PositionEnum.RB,
      PositionEnum.CB,
      PositionEnum.GK,
    ];

    for (let i = 0; i < 440; i++) {
      const shuffledPositionIds = positionIds.sort(() => 0.5 - Math.random());

      const playerPositions = new Set<{
        positionId: PositionEnum;
        rating: PositionRatingEnum;
      }>();

      // If the first position is goalkeeper, the player can only have this primary position.
      if (shuffledPositionIds[0] === PositionEnum.GK) {
        playerPositions.add({
          positionId: 13,
          rating: PositionRatingEnum.Primary,
        });
      } else {
        const filteredPositionIds = shuffledPositionIds.filter(
          (positionId) => positionId !== PositionEnum.GK,
        );

        const primaryPositionsCount =
          Math.floor(Math.random() * PLAYERGLOBAL_MAX_PRIMARY_POSITIONS) + 1;
        const secondaryPositionsCount = Math.floor(
          Math.random() * (PLAYERGLOBAL_MAX_SECONDARY_POSITIONS + 1),
        );

        for (let j = 0; j < primaryPositionsCount; j++) {
          playerPositions.add({
            positionId: filteredPositionIds[j],
            rating: PositionRatingEnum.Primary,
          });
        }

        for (
          let j = primaryPositionsCount;
          j < primaryPositionsCount + secondaryPositionsCount;
          j++
        ) {
          playerPositions.add({
            positionId: filteredPositionIds[j],
            rating: PositionRatingEnum.Secondary,
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
