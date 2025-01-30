import { ReturnCompetitionsaveDTO } from 'src/competitionsave/dtos/returnCompetitionsave.dto';
import { ReturnTeamsaveDTO } from 'src/teamsave/dtos/returnTeamsave.dto';
import { RankingEntity } from '../entities/ranking.entity';

export class ReturnRankingDTO {
  id: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDifference: number;

  competitionsave?: ReturnCompetitionsaveDTO;
  teamsave?: ReturnTeamsaveDTO;

  constructor(rankingEntity: RankingEntity) {
    this.id = rankingEntity.id;
    this.points = rankingEntity.points;
    this.played = rankingEntity.played;
    this.wins = rankingEntity.wins;
    this.draws = rankingEntity.draws;
    this.losses = rankingEntity.losses;
    this.goalsFor = rankingEntity.goalsFor;
    this.goalsAgainst = rankingEntity.goalsAgainst;
    this.goalsDifference = rankingEntity.goalsFor - rankingEntity.goalsAgainst;

    this.competitionsave = rankingEntity.competitionsave
      ? new ReturnCompetitionsaveDTO(rankingEntity.competitionsave)
      : undefined;

    this.teamsave = rankingEntity.teamsave
      ? new ReturnTeamsaveDTO(rankingEntity.teamsave)
      : undefined;
  }
}
