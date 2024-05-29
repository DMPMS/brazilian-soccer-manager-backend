import { ReturnPlayerglobalDTO } from 'src/playerglobal/dtos/returnPlayerglobal.dto';
import { ReturnPositionDTO } from 'src/position/dtos/returnPosition.dto';
import { PlayerglobalPositionEntity } from '../entities/playerglobal_position.entity';

export class ReturnPlayerglobalPositionDTO {
  id: number;
  rating: number;
  playerglobal?: ReturnPlayerglobalDTO;
  position?: ReturnPositionDTO;

  constructor(playerglobalPositionEntity: PlayerglobalPositionEntity) {
    this.id = playerglobalPositionEntity.id;
    this.rating =
      typeof playerglobalPositionEntity.rating === 'string'
        ? parseFloat(playerglobalPositionEntity.rating)
        : playerglobalPositionEntity.rating;

    this.playerglobal = playerglobalPositionEntity.playerglobal
      ? new ReturnPlayerglobalDTO(playerglobalPositionEntity.playerglobal)
      : undefined;

    this.position = playerglobalPositionEntity.position
      ? new ReturnPositionDTO(playerglobalPositionEntity.position)
      : undefined;
  }
}
