import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerglobalDTO {
  @IsNumber()
  countryId: number;

  @IsOptional()
  @IsNumber()
  teamglobalId: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  overall: number;
}
