import { ReturnCountryDto } from 'src/country/dtos/returnCountry.dto';
import { ManagerglobalEntity } from '../entities/managerglobal.entity';

export class ReturnManagerglobalDto {
  id: number;
  name: string;
  age: number;
  country?: ReturnCountryDto;

  constructor(managerglobalEntity: ManagerglobalEntity) {
    this.id = managerglobalEntity.id;
    this.name = managerglobalEntity.name;
    this.age = managerglobalEntity.age;

    this.country = managerglobalEntity.country
      ? new ReturnCountryDto(managerglobalEntity.country)
      : undefined;
  }
}
