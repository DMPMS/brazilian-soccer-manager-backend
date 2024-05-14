import { ReturnSaveDTO } from 'src/save/dtos/returnSave.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDTO {
  id: number;
  name: string;
  userType: number;
  email: string;
  saves?: ReturnSaveDTO[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.userType = userEntity.userType;
    this.email = userEntity.email;

    this.saves = userEntity.saves
      ? userEntity.saves.map((save) => new ReturnSaveDTO(save))
      : undefined;
  }
}
