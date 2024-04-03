import { IsNumber, IsString } from 'class-validator';

export class CreateManagerglobalDto {
  @IsNumber()
  countryId: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
