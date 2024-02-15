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
import { UserType } from './enums/type.enum';
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
      throw new BadGatewayException('Email already registered in the system');
    }

    const passwordHashed = await createPasswordHashed(createUserDto.password);

    return this.userRepository.save({
      ...createUserDto,
      userType: UserType.User,
      password: passwordHashed,
    });
  }

  async findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(idUser: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: idUser,
      },
    });

    if (!user) {
      throw new NotFoundException(`idUser: ${idUser} not found.`);
    }

    return user;
  }

  async findUserByIdUsingRelations(idUser: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: idUser,
      },
      relations: ['saves'],
    });

    if (!user) {
      throw new NotFoundException(`idUser: ${idUser} not found.`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

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
      throw new BadRequestException('Last password invalid');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}
