import { SaveEntity } from '../entities/save.entity';

export class ReturnSaveDTO {
  id: number;
  name: string;

  constructor(saveEntity: SaveEntity) {
    this.id = saveEntity.id;
    this.name = saveEntity.name;
  }
}
