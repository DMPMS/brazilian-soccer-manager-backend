import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { ManagerglobalEntity } from '../entities/managerglobal.entity';
import { ReturnTeamglobalDTO } from 'src/teamglobal/dtos/returnTeamglobal.dto';

export class ReturnManagerglobalDTO {
  id: number;
  name: string;
  age: number;
  country?: ReturnCountryDTO;
  teamglobal?: ReturnTeamglobalDTO;

  constructor(managerglobalEntity: ManagerglobalEntity) {
    this.id = managerglobalEntity.id;
    this.name = managerglobalEntity.name;
    this.age = managerglobalEntity.age;

    this.country = managerglobalEntity.country
      ? new ReturnCountryDTO(managerglobalEntity.country)
      : undefined;

    this.teamglobal = managerglobalEntity.teamglobal
      ? new ReturnTeamglobalDTO(managerglobalEntity.teamglobal)
      : undefined;
  }
}
