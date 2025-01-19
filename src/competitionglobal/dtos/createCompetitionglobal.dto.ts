import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
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
import { isValidImage } from 'src/validators/isValidImage';
import { UniqueArray } from 'src/validators/uniqueArray';

export class CreateCompetitionglobalDTO {
  @IsInt()
  ruleId: number;

  @IsOptional()
  @IsInt()
  countryId?: number;

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
  @Validate(isValidImage)
  srcImage: string;

  @IsArray()
  @IsInt({ each: true })
  @Validate(UniqueArray)
  @ArrayNotEmpty()
  teamglobalIds: number[];
}
