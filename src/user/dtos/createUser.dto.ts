import { IsInt, IsString, Length, Max, Min, Validate } from 'class-validator';
import {
  USER_MAX_AGE,
  USER_MAX_LENGH_NAME,
  USER_MAX_LENGH_PASSWORD,
  USER_MIN_AGE,
  USER_MIN_LENGH_NAME,
  USER_MIN_LENGH_PASSWORD,
} from 'src/utils/constants/dtoValidators';
import { IsCustomEmail } from 'src/validators/isCustomEmail';

export class CreateUserDTO {
  @IsInt()
  countryId: number;

  @IsString()
  @Length(USER_MIN_LENGH_NAME, USER_MAX_LENGH_NAME)
  name: string;

  @IsInt()
  @Min(USER_MIN_AGE)
  @Max(USER_MAX_AGE)
  age: number;

  @IsString()
  @Validate(IsCustomEmail)
  email: string;

  @IsString()
  @Length(USER_MIN_LENGH_PASSWORD, USER_MAX_LENGH_PASSWORD)
  password: string;

  @IsString()
  confirmPassword: string;
}
