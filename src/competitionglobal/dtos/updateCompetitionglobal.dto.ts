import { IsNumber, IsString } from 'class-validator';

export class UpdateCompetitionglobalDTO {
  @IsNumber()
  ruleId: number;

  @IsString()
  name: string;

  @IsString()
  season: string;

  @IsString()
  srcImage: string;
}
