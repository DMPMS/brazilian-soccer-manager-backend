import { ReturnSaveDto } from 'src/save/dtos/returnSave.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  saves?: ReturnSaveDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;

    this.saves = userEntity.saves
      ? userEntity.saves.map((save) => new ReturnSaveDto(save))
      : undefined;
  }
}
