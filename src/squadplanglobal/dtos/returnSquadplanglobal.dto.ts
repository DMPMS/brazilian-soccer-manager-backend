import { ReturnFormationDTO } from 'src/formation/dtos/returnFormation.dto';
import { SquadplanglobalEntity } from '../entities/squadplanglobal.entity';

export class ReturnSquadplanglobalDTO {
  id: number;
  playerglobalIds: number[];

  formation?: ReturnFormationDTO;

  constructor(squadplanglobalEntity: SquadplanglobalEntity) {
    this.id = squadplanglobalEntity.id;
    this.playerglobalIds = squadplanglobalEntity.playerglobalIds;

    this.formation = squadplanglobalEntity.formation
      ? new ReturnFormationDTO(squadplanglobalEntity.formation)
      : undefined;
  }
}
