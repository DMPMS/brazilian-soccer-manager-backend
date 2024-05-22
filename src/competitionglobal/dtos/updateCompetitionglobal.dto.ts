import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateCompetitionglobalDTO {
  @IsNumber()
  ruleId: number;

  @IsString()
  name: string;

  @IsString()
  season: string;

  @IsString()
  srcImage: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  teamglobalIds: number[];
}
