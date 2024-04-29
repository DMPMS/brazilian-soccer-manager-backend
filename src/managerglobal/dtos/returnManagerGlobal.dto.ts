import { ReturnCountryDto } from 'src/country/dtos/returnCountry.dto';
import { ManagerglobalEntity } from '../entities/managerglobal.entity';
import { ReturnTeamglobalDto } from 'src/teamglobal/dtos/returnTeamglobal.dto';

export class ReturnManagerglobalDto {
  id: number;
  name: string;
  age: number;
  country?: ReturnCountryDto;
  teamglobal?: ReturnTeamglobalDto;

  constructor(managerglobalEntity: ManagerglobalEntity) {
    this.id = managerglobalEntity.id;
    this.name = managerglobalEntity.name;
    this.age = managerglobalEntity.age;

    this.country = managerglobalEntity.country
      ? new ReturnCountryDto(managerglobalEntity.country)
      : undefined;

    this.teamglobal = managerglobalEntity.teamglobal
      ? new ReturnTeamglobalDto(managerglobalEntity.teamglobal)
      : undefined;
  }
}
