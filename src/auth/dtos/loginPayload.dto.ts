import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayload {
  id: number;
  userType: number;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.userType = userEntity.userType;
  }
}
