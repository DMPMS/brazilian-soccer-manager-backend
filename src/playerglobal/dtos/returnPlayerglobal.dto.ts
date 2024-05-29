import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { ReturnTeamglobalDTO } from 'src/teamglobal/dtos/returnTeamglobal.dto';
import { PlayerglobalEntity } from '../entities/playerglobal.entity';
import { ReturnPlayerglobalPositionDTO } from 'src/playerglobal_position/dtos/returnCompetitionglobalTeamglobal.dto';

export class ReturnPlayerglobalDTO {
  id: number;
  name: string;
  age: number;
  overall: number;
  country?: ReturnCountryDTO;
  teamglobal?: ReturnTeamglobalDTO;

  playersglobalPosition?: ReturnPlayerglobalPositionDTO[];

  constructor(playerglobal: PlayerglobalEntity) {
    this.id = playerglobal.id;
    this.name = playerglobal.name;
    this.age = playerglobal.age;
    this.overall = playerglobal.overall;

    this.country = playerglobal.country
      ? new ReturnCountryDTO(playerglobal.country)
      : undefined;

    this.teamglobal = playerglobal.teamglobal
      ? new ReturnTeamglobalDTO(playerglobal.teamglobal)
      : undefined;

    this.playersglobalPosition = playerglobal.playersglobalPosition
      ? playerglobal.playersglobalPosition.map(
          (playerglobalPosition) =>
            new ReturnPlayerglobalPositionDTO(playerglobalPosition),
        )
      : undefined;
  }
}
