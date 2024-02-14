import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async findAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAllUser()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  }

  @Get('/:idUser')
  async findUserById(@Param('idUser') idUser: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.findUserByIdUsingRelations(idUser),
    );
  }
}
