import { IsNumber, IsString } from 'class-validator';

export class CreateTeamglobalDTO {
  @IsNumber()
  countryId: number;

  @IsNumber()
  managerglobalId: number;

  @IsString()
  name: string;

  @IsString()
  srcImage: string;
}
