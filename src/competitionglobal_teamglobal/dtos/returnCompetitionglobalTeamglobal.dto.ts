import { ReturnCompetitionglobalDTO } from 'src/competitionglobal/dtos/returnCompetitionglobal.dto';
import { ReturnTeamglobalDTO } from 'src/teamglobal/dtos/returnTeamglobal.dto';
import { CompetitionglobalTeamglobalEntity } from '../entities/competitionglobal_teamglobal.entity';

export class ReturnCompetitionglobalTeamglobalDTO {
  id: number;

  competitionglobal?: ReturnCompetitionglobalDTO;
  teamglobal?: ReturnTeamglobalDTO;

  constructor(
    competitionglobalTeamglobalEntity: CompetitionglobalTeamglobalEntity,
  ) {
    this.id = competitionglobalTeamglobalEntity.id;

    this.competitionglobal = competitionglobalTeamglobalEntity.competitionglobal
      ? new ReturnCompetitionglobalDTO(
          competitionglobalTeamglobalEntity.competitionglobal,
        )
      : undefined;

    this.teamglobal = competitionglobalTeamglobalEntity.teamglobal
      ? new ReturnTeamglobalDTO(competitionglobalTeamglobalEntity.teamglobal)
      : undefined;
  }
}
