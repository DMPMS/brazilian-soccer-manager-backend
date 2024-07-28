import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enums/userType.enum';
import { UpdatePasswordDTO } from './dtos/updatePassword.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';
import { RelationsOptions } from 'src/types/RelationsOptions.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    if (createUserDTO.password !== createUserDTO.confirmPassword) {
      throw new BadRequestException(`The passwords do not match.`);
    }

    const emailToLower = createUserDTO.email.toLowerCase();

    const user = await this.findUserByEmail(emailToLower).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('Email already registered.');
    }

    const passwordHashed = await createPasswordHashed(createUserDTO.password);

    return this.userRepository.save({
      ...createUserDTO,
      userType: UserType.User,
      email: emailToLower,
      password: passwordHashed,
    });
  }

  async findAllUser(): Promise<UserEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        userType: UserType.User,
      },
      order: {
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    const users = await this.userRepository.find(findOptions);

    if (!users) {
      throw new NotFoundException(`Users not found.`);
    }

    return users;
  }

  async findUserById(
    userId: number,
    relations?: RelationsOptions,
  ): Promise<UserEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: userId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException(`userId: ${userId} not found.`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    let findOptions = {};

    const emailToLower = email.toLowerCase();

    findOptions = {
      ...findOptions,
      where: {
        email: emailToLower,
      },
    };

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException(`Email: ${emailToLower} not found.`);
    }

    return user;
  }

  async updateUserPassword(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const newPasswordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid.');
    }

    return this.userRepository.save({
      ...user,
      password: newPasswordHashed,
    });
  }
}
