import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { ManagerglobalEntity } from '../entities/managerglobal.entity';
import { ReturnTeamglobalDTO } from 'src/teamglobal/dtos/returnTeamglobal.dto';

export class ReturnManagerglobalDTO {
  id: number;
  name: string;
  birthdate: string;

  country?: ReturnCountryDTO;
  teamglobal?: ReturnTeamglobalDTO;

  constructor(managerglobalEntity: ManagerglobalEntity) {
    this.id = managerglobalEntity.id;
    this.name = managerglobalEntity.name;
    this.birthdate = managerglobalEntity.birthdate.toISOString().split('T')[0];

    this.country = managerglobalEntity.country
      ? new ReturnCountryDTO(managerglobalEntity.country)
      : undefined;

    this.teamglobal = managerglobalEntity.teamglobal
      ? new ReturnTeamglobalDTO(managerglobalEntity.teamglobal)
      : undefined;
  }
}
