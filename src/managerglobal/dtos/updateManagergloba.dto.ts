import { IsNumber, IsString } from 'class-validator';

export class UpdateManagerglobalDto {
  @IsNumber()
  countryId: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
