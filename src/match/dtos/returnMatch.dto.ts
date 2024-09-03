import { ReturnRoundDTO } from 'src/round/dtos/returnRound.dto';
import { ReturnTeamsaveDTO } from 'src/teamsave/dtos/returnTeamsave.dto';
import { MatchEntity } from '../entities/match.entity';

export class ReturnMatchDTO {
  id: number;
  date: string;
  teamsaveHomeGoals: number | null;
  teamsaveAwayGoals: number | null;

  round?: ReturnRoundDTO;
  teamsaveHome?: ReturnTeamsaveDTO;
  teamsaveAway?: ReturnTeamsaveDTO;

  constructor(matchEntity: MatchEntity) {
    this.id = matchEntity.id;
    this.date = matchEntity.date.toISOString().split('T')[0];
    this.teamsaveHomeGoals = matchEntity.teamsaveHomeGoals;
    this.teamsaveAwayGoals = matchEntity.teamsaveAwayGoals;

    this.round = matchEntity.round
      ? new ReturnRoundDTO(matchEntity.round)
      : undefined;

    this.teamsaveHome = matchEntity.teamsaveHome
      ? new ReturnTeamsaveDTO(matchEntity.teamsaveHome)
      : undefined;

    this.teamsaveAway = matchEntity.teamsaveAway
      ? new ReturnTeamsaveDTO(matchEntity.teamsaveAway)
      : undefined;
  }
}
