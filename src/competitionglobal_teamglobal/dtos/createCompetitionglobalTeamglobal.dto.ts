import { IsInt } from 'class-validator';

export class CreateCompetitionglobalTeamglobalDTO {
  @IsInt()
  competitionglobalId: number;

  @IsInt()
  teamglobalId: number;
}
