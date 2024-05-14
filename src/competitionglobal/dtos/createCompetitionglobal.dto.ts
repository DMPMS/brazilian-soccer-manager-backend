import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompetitionglobalDTO {
  @IsNumber()
  ruleId: number;

  @IsOptional()
  @IsNumber()
  countryId?: number;

  @IsString()
  name: string;

  @IsString()
  season: string;

  @IsString()
  srcImage: string;
}
