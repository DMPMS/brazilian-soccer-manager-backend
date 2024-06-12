import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateTeamglobalDTO {
  @IsNumber()
  countryId: number;

  @IsNumber()
  managerglobalId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  playerglobalIds: number[];

  @IsString()
  name: string;

  @IsString()
  srcImage: string;
}
