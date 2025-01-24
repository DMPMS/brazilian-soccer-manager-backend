import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { ReturnTeamsaveDTO } from 'src/teamsave/dtos/returnTeamsave.dto';
import { PlayersaveEntity } from '../entities/playersave.entity';
import { ReturnPlayersavePositionDTO } from 'src/playersave_position/dtos/returnPlayersavePosition.dto';

export class ReturnPlayersaveDTO {
  id: number;
  name: string;
  birthdate: string;
  overall: number;
  stamina: number;

  country?: ReturnCountryDTO;
  teamsave?: ReturnTeamsaveDTO;
  playerssavePosition?: ReturnPlayersavePositionDTO[];

  constructor(playersaveEntity: PlayersaveEntity) {
    this.id = playersaveEntity.id;
    this.name = playersaveEntity.name;
    this.birthdate = playersaveEntity.birthdate.toISOString().split('T')[0];
    this.overall = playersaveEntity.overall;
    this.stamina = playersaveEntity.stamina;

    this.country = playersaveEntity.country
      ? new ReturnCountryDTO(playersaveEntity.country)
      : undefined;

    this.teamsave = playersaveEntity.teamsave
      ? new ReturnTeamsaveDTO(playersaveEntity.teamsave)
      : undefined;

    this.playerssavePosition = playersaveEntity.playerssavePosition
      ? playersaveEntity.playerssavePosition
          .map(
            (playersavePosition) =>
              new ReturnPlayersavePositionDTO(playersavePosition),
          )
          .sort((a, b) => b.position.id - a.position.id)
      : undefined;
  }
}
