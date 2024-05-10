import { IsNumber, IsString } from 'class-validator';

export class UpdateCompetitionglobalDto {
  @IsNumber()
  ruleId: number;

  @IsString()
  name: string;

  @IsString()
  season: string;

  @IsString()
  srcImage: string;
}
