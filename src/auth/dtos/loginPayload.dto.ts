import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';
import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayload {
  id: number;
  userType: UserUserTypeEnum;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.userType = userEntity.userType;
  }
}
