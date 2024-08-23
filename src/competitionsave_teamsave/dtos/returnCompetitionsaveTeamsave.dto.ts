import { ReturnCompetitionsaveDTO } from 'src/competitionsave/dtos/returnCompetitionsave.dto';
import { ReturnTeamsaveDTO } from 'src/teamsave/dtos/returnTeamsave.dto';
import { CompetitionsaveTeamsaveEntity } from '../entities/competitionsave_teamsave.entity';

export class ReturnCompetitionsaveTeamsaveDTO {
  id: number;

  competitionsave?: ReturnCompetitionsaveDTO;
  teamsave?: ReturnTeamsaveDTO;

  constructor(competitionsaveTeamsaveEntity: CompetitionsaveTeamsaveEntity) {
    this.id = competitionsaveTeamsaveEntity.id;

    this.competitionsave = competitionsaveTeamsaveEntity.competitionsave
      ? new ReturnCompetitionsaveDTO(
          competitionsaveTeamsaveEntity.competitionsave,
        )
      : undefined;

    this.teamsave = competitionsaveTeamsaveEntity.teamsave
      ? new ReturnTeamsaveDTO(competitionsaveTeamsaveEntity.teamsave)
      : undefined;
  }
}
