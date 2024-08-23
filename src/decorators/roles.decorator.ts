import { SetMetadata } from '@nestjs/common';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserUserTypeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
