import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...createUserDto,
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
}
