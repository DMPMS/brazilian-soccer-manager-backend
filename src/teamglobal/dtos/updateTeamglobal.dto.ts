import { IsNumber, IsString } from 'class-validator';

export class UpdateTeamglobalDto {
  @IsNumber()
  countryId: number;

  @IsNumber()
  managerglobalId: number;

  @IsString()
  name: string;

  @IsString()
  srcImage: string;
}
