import { IsString, Validate } from 'class-validator';
import { IsCustomEmail } from 'src/validators/isCustomEmail';

export class LoginDTO {
  @IsString()
  @Validate(IsCustomEmail)
  email: string;

  @IsString()
  password: string;
}
