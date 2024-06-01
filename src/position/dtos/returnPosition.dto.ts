import { PositionEntity } from '../entities/position.entity';

export class ReturnPositionDTO {
  id: number;
  name: string;
  abbreviation: string;
  area: string;

  constructor(positionEntity: PositionEntity) {
    this.id = positionEntity.id;
    this.name = positionEntity.name;
    this.abbreviation = positionEntity.abbreviation;
    this.area = positionEntity.area;
  }
}
