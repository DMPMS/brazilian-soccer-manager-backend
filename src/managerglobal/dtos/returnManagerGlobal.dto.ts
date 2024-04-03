import { ReturnCountryDto } from 'src/country/dtos/returnCountry.dto';
import { ManagerGlobalEntity } from '../entities/managerglobal.entity';

export class ReturnManagerGlobalDto {
  id: number;
  name: string;
  age: number;
  country?: ReturnCountryDto;

  constructor(managerGlobalEntity: ManagerGlobalEntity) {
    this.id = managerGlobalEntity.id;
    this.name = managerGlobalEntity.name;
    this.age = managerGlobalEntity.age;

    this.country = managerGlobalEntity.country
      ? new ReturnCountryDto(managerGlobalEntity.country)
      : undefined;
  }
}
