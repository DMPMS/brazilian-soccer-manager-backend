import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async findAllCountry(): Promise<CountryEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        name: 'ASC',
      },
    };

    const countries = await this.countryRepository.find(findOptions);

    if (!countries) {
      throw new NotFoundException(`Countries not found.`);
    }

    return countries;
  }

  async findCountryById(countryId: number): Promise<CountryEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: countryId,
      },
    };

    const country = await this.countryRepository.findOne(findOptions);

    if (!country) {
      throw new NotFoundException(`countryId: ${countryId} not found.`);
    }

    return country;
  }
}
