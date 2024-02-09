import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryEntity } from './entities/country.entity';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAllCountry(): Promise<CountryEntity[]> {
    return this.countryService.getAllCountry();
  }
}
