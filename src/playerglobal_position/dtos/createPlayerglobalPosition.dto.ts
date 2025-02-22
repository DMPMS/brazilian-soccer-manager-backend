import { IsEnum, IsInt } from 'class-validator';
import { PositionEnum } from 'src/shared/enums/Position.enum';
import { PositionRatingEnum } from 'src/shared/enums/PositionRating.enum';

export class CreatePlayerglobalPositionlDTO {
  @IsInt()
  playerglobalId: number;

  @IsEnum(PositionEnum)
  positionId: PositionEnum;

  @IsEnum(PositionRatingEnum)
  rating: PositionRatingEnum;
}
