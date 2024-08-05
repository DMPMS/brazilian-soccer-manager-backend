import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { ManagersaveEntity } from '../entities/managersave.entity';
import { ReturnTeamsaveDTO } from 'src/teamsave/dtos/returnTeamsave.dto';

export class ReturnManagersaveDTO {
  id: number;
  name: string;
  birthdate: string;
  controlled: boolean;
  country?: ReturnCountryDTO;
  teamsave?: ReturnTeamsaveDTO;

  constructor(managersaveEntity: ManagersaveEntity) {
    this.id = managersaveEntity.id;
    this.name = managersaveEntity.name;
    this.birthdate = managersaveEntity.birthdate.toISOString().split('T')[0];
    this.controlled = managersaveEntity.controlled;

    this.country = managersaveEntity.country
      ? new ReturnCountryDTO(managersaveEntity.country)
      : undefined;

    this.teamsave = managersaveEntity.teamsave
      ? new ReturnTeamsaveDTO(managersaveEntity.teamsave)
      : undefined;
  }
}
