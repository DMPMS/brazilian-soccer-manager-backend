import { IsInt, IsString, Length, Validate } from 'class-validator';
import {
  MANAGERGLOBAL_MAX_AGE,
  MANAGERGLOBAL_MAX_LENGH_NAME,
  MANAGERGLOBAL_MIN_AGE,
  MANAGERGLOBAL_MIN_LENGH_NAME,
} from 'src/utils/constants/dtoValidators';
import { IsCustomDate } from 'src/validators/isCustomDate';
import { IsDateWithinAgeRange } from 'src/validators/isDateWithinAgeRange';

export class CreateManagerglobalDTO {
  @IsInt()
  countryId: number;

  @IsString()
  @Length(MANAGERGLOBAL_MIN_LENGH_NAME, MANAGERGLOBAL_MAX_LENGH_NAME)
  name: string;

  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [
    MANAGERGLOBAL_MIN_AGE,
    MANAGERGLOBAL_MAX_AGE,
  ])
  birthdate: string;
}
