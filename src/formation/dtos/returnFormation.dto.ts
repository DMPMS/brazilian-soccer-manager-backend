import { FormationEntity } from '../entities/formation.entity';

export class ReturnFormationDTO {
  id: number;
  name: string;

  constructor(formationEntity: FormationEntity) {
    this.id = formationEntity.id;
    this.name = formationEntity.name;
  }
}
