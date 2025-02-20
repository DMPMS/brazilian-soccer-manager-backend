import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { FormationEnum } from 'src/shared/enums/Formation.enum';
import {
  TEAMGLOBAL_MAX_LENGH_NAME,
  TEAMGLOBAL_MAX_PLAYERSGLOBAL,
  TEAMGLOBAL_MIN_LENGH_NAME,
  TEAMGLOBAL_MIN_PLAYERSGLOBAL,
  TEAMGLOBAL_SQUADPLANGLOBAL_PLAYERSGLOBAL_LENGTH,
} from 'src/utils/constants/dtoValidators';
import { isValidImage } from 'src/validators/isValidImage';
import { UniqueArray } from 'src/validators/uniqueArray';

export class CreateTeamglobalDTO {
  @IsInt()
  countryId: number;

  @IsInt()
  managerglobalId: number;

  @IsEnum(FormationEnum)
  squadplanglobalFormationId: FormationEnum;

  @IsArray()
  @IsInt({ each: true })
  @Validate(UniqueArray)
  @ArrayMinSize(TEAMGLOBAL_MIN_PLAYERSGLOBAL)
  @ArrayMaxSize(TEAMGLOBAL_MAX_PLAYERSGLOBAL)
  playerglobalIds: number[];

  @IsArray()
  @IsInt({ each: true })
  @Validate(UniqueArray)
  @ArrayMinSize(TEAMGLOBAL_SQUADPLANGLOBAL_PLAYERSGLOBAL_LENGTH)
  @ArrayMaxSize(TEAMGLOBAL_SQUADPLANGLOBAL_PLAYERSGLOBAL_LENGTH)
  squadplanglobalPlayerglobalIds: number[];

  @IsString()
  @Length(TEAMGLOBAL_MIN_LENGH_NAME, TEAMGLOBAL_MAX_LENGH_NAME)
  name: string;

  @IsString()
  @Validate(isValidImage)
  srcImage: string;
}
