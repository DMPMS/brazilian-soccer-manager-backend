import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import {
  MANAGERSAVE_MAX_AGE,
  MANAGERSAVE_MAX_LENGH_NAME,
  MANAGERSAVE_MIN_AGE,
  MANAGERSAVE_MIN_LENGH_NAME,
  USER_MAX_LENGH_NAME,
  USER_MIN_LENGH_NAME,
} from 'src/utils/constants/dtoValidators';
import { IsCustomDate } from 'src/validators/isCustomDate';
import { IsDateWithinAgeRange } from 'src/validators/isDateWithinAgeRange';

export class CreateSaveDTO {
  @IsString()
  @Length(USER_MIN_LENGH_NAME, USER_MAX_LENGH_NAME)
  name: string;

  @IsInt()
  teamglobalId: number;

  @IsBoolean()
  isCustomManager: boolean;

  @IsOptional()
  @IsInt()
  managerCountryId: number;

  @IsOptional()
  @IsString()
  @Length(MANAGERSAVE_MIN_LENGH_NAME, MANAGERSAVE_MAX_LENGH_NAME)
  managerName: string;

  @IsOptional()
  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [MANAGERSAVE_MIN_AGE, MANAGERSAVE_MAX_AGE])
  managerBirthdate: string;
}
