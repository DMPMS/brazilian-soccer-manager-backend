import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { CompetitionglobalEntity } from '../entities/competitionglobal.entity';
import { ReturnRuleDTO } from 'src/rule/dtos/returnRule.dto';
import { ReturnCompetitionglobalTeamglobalDTO } from 'src/competitionglobal_teamglobal/dtos/returnCompetitionglobalTeamglobal.dto';

export class ReturnCompetitionglobalDTO {
  id: number;
  name: string;
  season: string;
  srcImage: string;
  rule?: ReturnRuleDTO;
  country?: ReturnCountryDTO;
  competitionsglobalTeamglobal?: ReturnCompetitionglobalTeamglobalDTO[];

  constructor(competitionglobalEntity: CompetitionglobalEntity) {
    this.id = competitionglobalEntity.id;
    this.name = competitionglobalEntity.name;
    this.season = competitionglobalEntity.season;
    this.srcImage = competitionglobalEntity.srcImage;

    this.rule = competitionglobalEntity.rule
      ? new ReturnRuleDTO(competitionglobalEntity.rule)
      : undefined;

    this.country = competitionglobalEntity.country
      ? new ReturnCountryDTO(competitionglobalEntity.country)
      : undefined;

    this.competitionsglobalTeamglobal =
      competitionglobalEntity.competitionsglobalTeamglobal
        ? competitionglobalEntity.competitionsglobalTeamglobal.map(
            (competitionglobalTeamglobal) =>
              new ReturnCompetitionglobalTeamglobalDTO(
                competitionglobalTeamglobal,
              ),
          )
        : undefined;
  }
}
