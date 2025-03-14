import { FormationEnum } from 'src/shared/enums/Formation.enum';
import { FormationEntity } from '../entities/formation.entity';

export class ReturnFormationDTO {
  id: FormationEnum;
  name: string;

  constructor(formationEntity: FormationEntity) {
    this.id = formationEntity.id;
    this.name = formationEntity.name;
  }
}
