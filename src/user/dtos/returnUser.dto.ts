import { UserEntity } from '../entities/user.entity';
import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';

export class ReturnUserDTO {
  id: number;
  name: string;
  birthdate: string;
  email: string;
  country?: ReturnCountryDTO;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.birthdate = userEntity.birthdate.toISOString().split('T')[0];
    this.email = userEntity.email;

    this.country = userEntity.country
      ? new ReturnCountryDTO(userEntity.country)
      : undefined;
  }
}
