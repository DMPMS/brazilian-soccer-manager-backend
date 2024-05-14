import { CountryEntity } from '../entities/country.entity';

export class ReturnCountryDTO {
  id: number;
  name: string;

  constructor(country: CountryEntity) {
    this.id = country.id;
    this.name = country.name;
  }
}
