import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { ReturnCountryDto } from './dtos/returnCountry.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAllCountry(): Promise<ReturnCountryDto[]> {
    return (await this.countryService.findAllCountry()).map(
      (country) => new ReturnCountryDto(country),
    );
  }
}
