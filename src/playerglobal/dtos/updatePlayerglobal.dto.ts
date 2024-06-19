import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Validate,
} from 'class-validator';
import {
  PLAYERGLOBAL_MAX_AGE,
  PLAYERGLOBAL_MAX_LENGH_NAME,
  PLAYERGLOBAL_MAX_OVERALL,
  PLAYERGLOBAL_MAX_PRIMARY_POSITIONS,
  PLAYERGLOBAL_MAX_SECONDARY_POSITIONS,
  PLAYERGLOBAL_MIN_AGE,
  PLAYERGLOBAL_MIN_LENGH_NAME,
  PLAYERGLOBAL_MIN_OVERALL,
  PLAYERGLOBAL_MIN_PRIMARY_POSITIONS,
} from 'src/utils/constants/dtoValidators';
import { UniqueArray } from 'src/validators/customValidators';

export class UpdatePlayerglobalDTO {
  @IsInt()
  countryId: number;

  @IsOptional()
  @IsInt()
  teamglobalId: number;

  @IsString()
  @Length(PLAYERGLOBAL_MIN_LENGH_NAME, PLAYERGLOBAL_MAX_LENGH_NAME)
  name: string;

  @IsInt()
  @Min(PLAYERGLOBAL_MIN_AGE)
  @Max(PLAYERGLOBAL_MAX_AGE)
  age: number;

  @IsInt()
  @Min(PLAYERGLOBAL_MIN_OVERALL)
  @Max(PLAYERGLOBAL_MAX_OVERALL)
  overall: number;

  @IsArray()
  @IsInt({ each: true })
  @Validate(UniqueArray)
  @ArrayMinSize(PLAYERGLOBAL_MIN_PRIMARY_POSITIONS)
  @ArrayMaxSize(PLAYERGLOBAL_MAX_PRIMARY_POSITIONS)
  primaryPositionIds: number[];

  @IsArray()
  @Validate(UniqueArray)
  @IsInt({ each: true })
  @ArrayMaxSize(PLAYERGLOBAL_MAX_SECONDARY_POSITIONS)
  secondaryPositionIds: number[];
}
