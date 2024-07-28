import { IsInt, IsString, Length, Validate } from 'class-validator';
import {
  USER_MAX_AGE,
  USER_MAX_LENGH_NAME,
  USER_MAX_LENGH_PASSWORD,
  USER_MIN_AGE,
  USER_MIN_LENGH_NAME,
  USER_MIN_LENGH_PASSWORD,
} from 'src/utils/constants/dtoValidators';
import { IsCustomDate } from 'src/validators/isCustomDate';
import { IsCustomEmail } from 'src/validators/isCustomEmail';
import { IsDateWithinAgeRange } from 'src/validators/isDateWithinAgeRange';

export class CreateUserDTO {
  @IsInt()
  countryId: number;

  @IsString()
  @Length(USER_MIN_LENGH_NAME, USER_MAX_LENGH_NAME)
  name: string;

  @IsString()
  @Validate(IsCustomDate)
  @Validate(IsDateWithinAgeRange, [USER_MIN_AGE, USER_MAX_AGE])
  birthdate: string;

  @IsString()
  @Validate(IsCustomEmail)
  email: string;

  @IsString()
  @Length(USER_MIN_LENGH_PASSWORD, USER_MAX_LENGH_PASSWORD)
  password: string;

  @IsString()
  confirmPassword: string;
}
