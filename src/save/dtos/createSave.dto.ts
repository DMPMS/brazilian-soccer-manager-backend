import { IsString } from 'class-validator';

export class CreateSaveDto {
  @IsString()
  name: string;
}
