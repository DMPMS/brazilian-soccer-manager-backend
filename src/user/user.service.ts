import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enums/userType.enum';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('Email already registered in the system.');
    }

    const passwordHashed = await createPasswordHashed(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      userType: UserType.User,
      password: passwordHashed,
    });
  }

  async findAllUser(): Promise<UserEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        createdAt: 'DESC',
      },
    };

    const users = await this.userRepository.find(findOptions);

    if (!users) {
      throw new NotFoundException(`Users not found.`);
    }

    return users;
  }

  async findUserById(userId: number): Promise<UserEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: userId,
      },
    };

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException(`userId: ${userId} not found.`);
    }

    return user;
  }

  async findUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: userId,
      },
      relations: ['saves'],
    };

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException(`userId: ${userId} not found.`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        email: email,
      },
    };

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException(`Email: ${email} not found.`);
    }

    return user;
  }

  async updateUserPassword(
    updatePasswordDTO: UpdatePasswordDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid.');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}
