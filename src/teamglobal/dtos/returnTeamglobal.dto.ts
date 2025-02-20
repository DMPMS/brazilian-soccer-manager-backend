import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { TeamglobalEntity } from '../entities/teamglobal.entity';
import { ReturnCompetitionglobalTeamglobalDTO } from 'src/competitionglobal_teamglobal/dtos/returnCompetitionglobalTeamglobal.dto';
import { ReturnPlayerglobalDTO } from 'src/playerglobal/dtos/returnPlayerglobal.dto';
import { ReturnManagerglobalDTO } from 'src/managerglobal/dtos/returnManagerglobal.dto';
import { ReturnSquadplanglobalDTO } from 'src/squadplanglobal/dtos/returnSquadplanglobal.dto';

export class ReturnTeamglobalDTO {
  id: number;
  name: string;
  srcImage: string;

  country?: ReturnCountryDTO;
  managerglobal?: ReturnManagerglobalDTO;
  playersglobal?: ReturnPlayerglobalDTO[];
  squadplanglobal?: ReturnSquadplanglobalDTO;

  playersglobalCount: number;

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

    this.playersglobal = teamglobalEntity.playersglobal
      ? teamglobalEntity.playersglobal.map(
          (playerglobal) => new ReturnPlayerglobalDTO(playerglobal),
        )
      : undefined;

    this.squadplanglobal = teamglobalEntity.squadplanglobal
      ? new ReturnSquadplanglobalDTO(teamglobalEntity.squadplanglobal)
      : undefined;

    this.playersglobalCount = teamglobalEntity.playersglobalCount;

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
