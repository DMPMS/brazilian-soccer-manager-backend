import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { TeamglobalEntity } from '../entities/teamglobal.entity';
import { ReturnManagerglobalDTO } from 'src/managerglobal/dtos/returnManagerglobal.dto';
import { ReturnCompetitionglobalTeamglobalDTO } from 'src/competitionglobal_teamglobal/dtos/returnCompetitionglobalTeamglobal.dto';

export class ReturnTeamglobalDTO {
  id: number;
  name: string;
  srcImage: string;
  country?: ReturnCountryDTO;
  managerglobal?: ReturnManagerglobalDTO;
  competitionsglobalTeamglobal?: ReturnCompetitionglobalTeamglobalDTO[];

  constructor(teamglobalEntity: TeamglobalEntity) {
    this.id = teamglobalEntity.id;
    this.name = teamglobalEntity.name;
    this.srcImage = teamglobalEntity.srcImage;

    this.country = teamglobalEntity.country
      ? new ReturnCountryDTO(teamglobalEntity.country)
      : undefined;

    this.managerglobal = teamglobalEntity.managerglobal
      ? new ReturnManagerglobalDTO(teamglobalEntity.managerglobal)
      : undefined;

    this.competitionsglobalTeamglobal =
      teamglobalEntity.competitionsglobalTeamglobal
        ? teamglobalEntity.competitionsglobalTeamglobal.map(
            (competitionglobalTeamglobal) =>
              new ReturnCompetitionglobalTeamglobalDTO(
                competitionglobalTeamglobal,
              ),
          )
        : undefined;
  }
}
