import { CompetitionglobalEntity } from '../entities/competitionglobal.entity';
import { ReturnRuleDTO } from 'src/rule/dtos/returnRule.dto';
import { ReturnCompetitionglobalTeamglobalDTO } from 'src/competitionglobal_teamglobal/dtos/returnCompetitionglobalTeamglobal.dto';

export class ReturnCompetitionglobalDTO {
  id: number;
  name: string;
  season: string;
  srcImage: string;

  rule?: ReturnRuleDTO;
  competitionsglobalTeamglobal?: ReturnCompetitionglobalTeamglobalDTO[];

  constructor(competitionglobalEntity: CompetitionglobalEntity) {
    this.id = competitionglobalEntity.id;
    this.name = competitionglobalEntity.name;
    this.season = competitionglobalEntity.season;
    this.srcImage = competitionglobalEntity.srcImage;

    this.rule = competitionglobalEntity.rule
      ? new ReturnRuleDTO(competitionglobalEntity.rule)
      : undefined;

    this.competitionsglobalTeamglobal =
      competitionglobalEntity.competitionsglobalTeamglobal
        ? competitionglobalEntity.competitionsglobalTeamglobal
            .map(
              (competitionglobalTeamglobal) =>
                new ReturnCompetitionglobalTeamglobalDTO(
                  competitionglobalTeamglobal,
                ),
            )
            .sort((a, b) => a.teamglobal.name.localeCompare(b.teamglobal.name))
        : undefined;
  }
}
