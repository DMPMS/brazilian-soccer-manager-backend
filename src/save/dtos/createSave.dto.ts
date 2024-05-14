import { IsString } from 'class-validator';

export class CreateSaveDTO {
  @IsString()
  name: string;
}
