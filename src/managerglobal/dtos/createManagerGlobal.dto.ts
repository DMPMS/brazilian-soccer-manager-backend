import { IsNumber, IsString } from 'class-validator';

export class CreateManagerGlobalDto {
  @IsNumber()
  countryId: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
