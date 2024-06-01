import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { UserId } from 'src/decorators/userId.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enums/userType.enum';
import { UpdatePasswordDTO } from './dtos/updatePassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUserDTO);
  }

  @Roles(UserType.Admin)
  @Get()
  async findAllUser(): Promise<ReturnUserDTO[]> {
    return (await this.userService.findAllUser()).map(
      (user) => new ReturnUserDTO(user),
    );
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  async findUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
    const relations = {
      saves: true,
    };

    return new ReturnUserDTO(
      await this.userService.findUserById(userId, relations),
    );
  }

  @Roles(UserType.Admin, UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() UpdatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updateUserPassword(UpdatePasswordDTO, userId);
  }
}
