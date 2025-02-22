import { ReturnPlayersaveDTO } from 'src/playersave/dtos/returnPlayersave.dto';
import { ReturnPositionDTO } from 'src/position/dtos/returnPosition.dto';
import { PlayersavePositionEntity } from '../entities/playersave_position.entity';
import { PositionRatingEnum } from 'src/shared/enums/PositionRating.enum';

export class ReturnPlayersavePositionDTO {
  id: number;
  rating: PositionRatingEnum;

  playersave?: ReturnPlayersaveDTO;
  position?: ReturnPositionDTO;

  constructor(playersavePositionEntity: PlayersavePositionEntity) {
    this.id = playersavePositionEntity.id;
    this.rating =
      typeof playersavePositionEntity.rating === 'string'
        ? parseFloat(playersavePositionEntity.rating)
        : playersavePositionEntity.rating;

    this.playersave = playersavePositionEntity.playersave
      ? new ReturnPlayersaveDTO(playersavePositionEntity.playersave)
      : undefined;

    this.position = playersavePositionEntity.position
      ? new ReturnPositionDTO(playersavePositionEntity.position)
      : undefined;
  }
}
