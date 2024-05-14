import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { ReturnCountryDTO } from './dtos/returnCountry.dto';

@Roles(UserType.Admin)
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
