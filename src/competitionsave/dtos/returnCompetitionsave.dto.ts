import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { ReturnRuleDTO } from 'src/rule/dtos/returnRule.dto';
import { CompetitionsaveEntity } from '../entities/competitionsave.entity';
import { ReturnCompetitionsaveTeamsaveDTO } from 'src/competitionsave_teamsave/dtos/returnCompetitionsaveTeamsave.dto';
import { ReturnRoundDTO } from 'src/round/dtos/returnRound.dto';

export class ReturnCompetitionsaveDTO {
  id: number;
  name: string;
  season: string;
  srcImage: string;

  rule?: ReturnRuleDTO;
  country?: ReturnCountryDTO;
  competitionssaveTeamsave?: ReturnCompetitionsaveTeamsaveDTO[];
  rounds?: ReturnRoundDTO[];

  constructor(competitionsaveEntity: CompetitionsaveEntity) {
    this.id = competitionsaveEntity.id;
    this.name = competitionsaveEntity.name;
    this.season = competitionsaveEntity.season;
    this.srcImage = competitionsaveEntity.srcImage;

    this.rule = competitionsaveEntity.rule
      ? new ReturnRuleDTO(competitionsaveEntity.rule)
      : undefined;

    this.country = competitionsaveEntity.country
      ? new ReturnCountryDTO(competitionsaveEntity.country)
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
      ? competitionsaveEntity.rounds.map((round) => new ReturnRoundDTO(round))
      : undefined;
  }
}
