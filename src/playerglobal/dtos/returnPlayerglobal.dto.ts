import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { ReturnTeamglobalDTO } from 'src/teamglobal/dtos/returnTeamglobal.dto';
import { PlayerglobalEntity } from '../entities/playerglobal.entity';
import { ReturnPlayerglobalPositionDTO } from 'src/playerglobal_position/dtos/returnPlayerglobalPosition.dto';

export class ReturnPlayerglobalDTO {
  id: number;
  name: string;
  birthdate: string;
  overall: number;

  country?: ReturnCountryDTO;
  teamglobal?: ReturnTeamglobalDTO;
  playersglobalPosition?: ReturnPlayerglobalPositionDTO[];

  constructor(playerglobalEntity: PlayerglobalEntity) {
    this.id = playerglobalEntity.id;
    this.name = playerglobalEntity.name;
    this.birthdate = playerglobalEntity.birthdate.toISOString().split('T')[0];
    this.overall = playerglobalEntity.overall;

    this.country = playerglobalEntity.country
      ? new ReturnCountryDTO(playerglobalEntity.country)
      : undefined;

    this.teamglobal = playerglobalEntity.teamglobal
      ? new ReturnTeamglobalDTO(playerglobalEntity.teamglobal)
      : undefined;

    this.playersglobalPosition = playerglobalEntity.playersglobalPosition
      ? playerglobalEntity.playersglobalPosition
          .map(
            (playerglobalPosition) =>
              new ReturnPlayerglobalPositionDTO(playerglobalPosition),
          )
          .sort((a, b) => b.position.id - a.position.id)
      : undefined;
  }
}
