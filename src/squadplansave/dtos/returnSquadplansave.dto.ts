import { ReturnFormationDTO } from 'src/formation/dtos/returnFormation.dto';
import { SquadplansaveEntity } from '../entities/squadplansave.entity';

export class ReturnSquadplansaveDTO {
  id: number;
  playersaveIds: number[];

  formation?: ReturnFormationDTO;

  constructor(squadplansaveEntity: SquadplansaveEntity) {
    this.id = squadplansaveEntity.id;
    this.playersaveIds = squadplansaveEntity.playersaveIds;

    this.formation = squadplansaveEntity.formation
      ? new ReturnFormationDTO(squadplansaveEntity.formation)
      : undefined;
  }
}
