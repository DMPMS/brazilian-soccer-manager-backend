import { PositionAreaEnum } from 'src/shared/enums/PositionArea.enum';
import { PositionEntity } from '../entities/position.entity';
import { PositionEnum } from 'src/shared/enums/Position.enum';

export class ReturnPositionDTO {
  id: PositionEnum;
  name: string;
  abbreviation: string;
  area: PositionAreaEnum;

  constructor(positionEntity: PositionEntity) {
    this.id = positionEntity.id;
    this.name = positionEntity.name;
    this.abbreviation = positionEntity.abbreviation;
    this.area = positionEntity.area;
  }
}
