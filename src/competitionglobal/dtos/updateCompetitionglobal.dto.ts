import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import {
  COMPETITIONGLOBAL_MAX_LENGH_NAME,
  COMPETITIONGLOBAL_MAX_LENGH_SEASON,
  COMPETITIONGLOBAL_MIN_LENGH_NAME,
  COMPETITIONGLOBAL_MIN_LENGH_SEASON,
} from 'src/utils/constants/dtoValidators';
import { UniqueArray } from 'src/validators/uniqueArray';

export class UpdateCompetitionglobalDTO {
  @IsInt()
  ruleId: number;

  @IsString()
  @Length(COMPETITIONGLOBAL_MIN_LENGH_NAME, COMPETITIONGLOBAL_MAX_LENGH_NAME)
  name: string;

  @IsString()
  @Length(
    COMPETITIONGLOBAL_MIN_LENGH_SEASON,
    COMPETITIONGLOBAL_MAX_LENGH_SEASON,
  )
  season: string;

  @IsString()
  srcImage: string;

  @IsArray()
  @IsInt({ each: true })
  @Validate(UniqueArray)
  @ArrayNotEmpty()
  teamglobalIds: number[];
}
