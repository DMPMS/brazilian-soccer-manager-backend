import { SaveEntity } from '../entities/save.entity';

export class ReturnSaveDto {
  id: number;
  name: string;

  constructor(save: SaveEntity) {
    this.id = save.id;
    this.name = save.name;
  }
}
