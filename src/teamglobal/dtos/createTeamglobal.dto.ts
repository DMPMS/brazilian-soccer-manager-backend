import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import {
  TEAMGLOBAL_MAX_LENGH_NAME,
  TEAMGLOBAL_MAX_PLAYERSGLOBAL,
  TEAMGLOBAL_MIN_LENGH_NAME,
  TEAMGLOBAL_MIN_PLAYERSGLOBAL,
} from 'src/utils/constants/dtoValidators';
import { isValidImage } from 'src/validators/isValidImage';
import { UniqueArray } from 'src/validators/uniqueArray';

export class CreateTeamglobalDTO {
  @IsInt()
  countryId: number;

  @IsInt()
  managerglobalId: number;

  @IsArray()
  @IsInt({ each: true })
  @Validate(UniqueArray)
  @ArrayMinSize(TEAMGLOBAL_MIN_PLAYERSGLOBAL)
  @ArrayMaxSize(TEAMGLOBAL_MAX_PLAYERSGLOBAL)
  playerglobalIds: number[];

  @IsString()
  @Length(TEAMGLOBAL_MIN_LENGH_NAME, TEAMGLOBAL_MAX_LENGH_NAME)
  name: string;

  @IsString()
  @Validate(isValidImage)
  srcImage: string;
}
