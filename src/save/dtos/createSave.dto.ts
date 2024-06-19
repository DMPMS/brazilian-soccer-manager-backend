import { IsString, Length } from 'class-validator';
import {
  USER_MAX_LENGH_NAME,
  USER_MIN_LENGH_NAME,
} from 'src/utils/constants/dtoValidators';

export class CreateSaveDTO {
  @IsString()
  @Length(USER_MIN_LENGH_NAME, USER_MAX_LENGH_NAME)
  name: string;
}
