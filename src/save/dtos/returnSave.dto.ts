import { ReturnManagersaveDTO } from 'src/managersave/dtos/returnManagersave.dto';
import { SaveEntity } from '../entities/save.entity';

export class ReturnSaveDTO {
  id: number;
  name: string;
  datetime: string;
  controllerManagersave?: ReturnManagersaveDTO;
  createdAt: string;
  updatedAt: string;

  constructor(saveEntity: SaveEntity) {
    this.id = saveEntity.id;
    this.name = saveEntity.name;
    this.datetime = saveEntity.datetime.toISOString().split('T')[0];

    this.controllerManagersave = saveEntity.controllerManagersave
      ? new ReturnManagersaveDTO(saveEntity.controllerManagersave)
      : undefined;

    this.createdAt = saveEntity.createdAt.toISOString();
    this.updatedAt = saveEntity.updatedAt.toISOString();
  }
}
