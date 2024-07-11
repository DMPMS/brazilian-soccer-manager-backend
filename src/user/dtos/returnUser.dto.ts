import { ReturnSaveDTO } from 'src/save/dtos/returnSave.dto';
import { UserEntity } from '../entities/user.entity';
import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';

export class ReturnUserDTO {
  id: number;
  name: string;
  userType: number;
  age: number;
  email: string;
  country?: ReturnCountryDTO;
  saves?: ReturnSaveDTO[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.userType = userEntity.userType;
    this.email = userEntity.email;

    this.country = userEntity.country
      ? new ReturnCountryDTO(userEntity.country)
      : undefined;

    this.saves = userEntity.saves
      ? userEntity.saves.map((save) => new ReturnSaveDTO(save))
      : undefined;
  }
}
