import { IsNumber, IsString } from 'class-validator';

export class UpdateTeamglobalDTO {
  @IsNumber()
  countryId: number;

  @IsNumber()
  managerglobalId: number;

  @IsString()
  name: string;

  @IsString()
  srcImage: string;
}
