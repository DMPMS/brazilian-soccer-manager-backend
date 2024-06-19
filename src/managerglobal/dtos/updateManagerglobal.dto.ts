import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import {
  MANAGERGLOBAL_MAX_AGE,
  MANAGERGLOBAL_MAX_LENGH_NAME,
  MANAGERGLOBAL_MIN_AGE,
  MANAGERGLOBAL_MIN_LENGH_NAME,
} from 'src/utils/constants/dtoValidators';

export class UpdateManagerglobalDTO {
  @IsInt()
  countryId: number;

  @IsString()
  @Length(MANAGERGLOBAL_MIN_LENGH_NAME, MANAGERGLOBAL_MAX_LENGH_NAME)
  name: string;

  @IsInt()
  @Min(MANAGERGLOBAL_MIN_AGE)
  @Max(MANAGERGLOBAL_MAX_AGE)
  age: number;
}
