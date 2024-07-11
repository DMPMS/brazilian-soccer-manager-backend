import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { ReturnCountryDTO } from './dtos/returnCountry.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAllCountry(): Promise<ReturnCountryDTO[]> {
    return (await this.countryService.findAllCountry()).map(
      (country) => new ReturnCountryDTO(country),
    );
  }
}
