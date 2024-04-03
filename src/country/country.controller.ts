import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryEntity } from './entities/country.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';

@Roles(UserType.User, UserType.Admin)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAllCountry(): Promise<CountryEntity[]> {
    return this.countryService.findAllCountry();
  }
}
