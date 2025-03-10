import { ReturnRuleDTO } from 'src/rule/dtos/returnRule.dto';
import { CompetitionsaveEntity } from '../entities/competitionsave.entity';
import { ReturnCompetitionsaveTeamsaveDTO } from 'src/competitionsave_teamsave/dtos/returnCompetitionsaveTeamsave.dto';
import { ReturnRoundDTO } from 'src/round/dtos/returnRound.dto';
import { ReturnRankingDTO } from 'src/ranking/dtos/returnRanking.dto';

export class ReturnCompetitionsaveDTO {
  id: number;
  name: string;
  season: string;
  srcImage: string;

  rule?: ReturnRuleDTO;
  competitionssaveTeamsave?: ReturnCompetitionsaveTeamsaveDTO[];
  rounds?: ReturnRoundDTO[];
  rankings?: ReturnRankingDTO[];

  constructor(competitionsaveEntity: CompetitionsaveEntity) {
    this.id = competitionsaveEntity.id;
    this.name = competitionsaveEntity.name;
    this.season = competitionsaveEntity.season;
    this.srcImage = competitionsaveEntity.srcImage;

    this.rule = competitionsaveEntity.rule
      ? new ReturnRuleDTO(competitionsaveEntity.rule)
      : undefined;

    this.competitionssaveTeamsave =
      competitionsaveEntity.competitionssaveTeamsave
        ? competitionsaveEntity.competitionssaveTeamsave
            .map(
              (competitionsaveTeamsave) =>
                new ReturnCompetitionsaveTeamsaveDTO(competitionsaveTeamsave),
            )
            .sort((a, b) => a.teamsave.name.localeCompare(b.teamsave.name))
        : undefined;

    this.rounds = competitionsaveEntity.rounds
      ? competitionsaveEntity.rounds
          .map((round) => new ReturnRoundDTO(round))
          .sort((a, b) => a.id - b.id)
      : undefined;

    this.rankings = competitionsaveEntity.rankings
      ? competitionsaveEntity.rankings.map(
          (ranking) => new ReturnRankingDTO(ranking),
        )
      : undefined;
  }
}
