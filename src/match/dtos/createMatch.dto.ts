import { IsInt } from 'class-validator';

export class CreateMatchDTO {
  @IsInt()
  roundId: number;

  @IsInt()
  teamsaveHomeId: number;

  @IsInt()
  teamsaveAwayId: number;

  // How?
  date: string;
}
