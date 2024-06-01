import { CountryEntity } from '../entities/country.entity';

export class ReturnCountryDTO {
  id: number;
  name: string;

  constructor(countryEntity: CountryEntity) {
    this.id = countryEntity.id;
    this.name = countryEntity.name;
  }
}
