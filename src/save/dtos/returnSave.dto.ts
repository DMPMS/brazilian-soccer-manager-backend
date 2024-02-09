import { SaveEntity } from '../entities/save.entity';

export class ReturnSaveDto {
  name: string;

  constructor(save: SaveEntity) {
    this.name = save.name;
  }
}
