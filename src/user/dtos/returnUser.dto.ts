import { UserEntity } from '../entities/user.entity';
import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';

export class ReturnUserDTO {
  id: number;
  name: string;
  userType: number;
  age: number;
  email: string;
  country?: ReturnCountryDTO;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.userType = userEntity.userType;
    this.email = userEntity.email;

    this.country = userEntity.country
      ? new ReturnCountryDTO(userEntity.country)
      : undefined;
  }
}
