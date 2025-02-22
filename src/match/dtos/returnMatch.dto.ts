import { ReturnRoundDTO } from 'src/round/dtos/returnRound.dto';
import { ReturnTeamsaveDTO } from 'src/teamsave/dtos/returnTeamsave.dto';
import { MatchEntity } from '../entities/match.entity';
import { format } from 'date-fns-tz';

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
    this.date = format(matchEntity.date, 'yyyy-MM-dd HH:mm:ss', {
      timeZone: 'America/Sao_Paulo',
    });
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
