import { IsNumber, IsString } from 'class-validator';

export class CreateManagerglobalDTO {
  @IsNumber()
  countryId: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
