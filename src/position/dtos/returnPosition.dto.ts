import { PositionEntity } from '../entities/position.entity';

export class ReturnPositionDTO {
  id: number;
  name: string;
  abbreviation: string;
  area: string;

  constructor(position: PositionEntity) {
    this.id = position.id;
    this.name = position.name;
    this.abbreviation = position.abbreviation;
    this.area = position.area;
  }
}
