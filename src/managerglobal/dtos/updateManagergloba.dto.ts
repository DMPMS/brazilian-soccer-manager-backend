import { IsNumber, IsString } from 'class-validator';

export class UpdateManagerglobalDTO {
  @IsNumber()
  countryId: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
