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
import { UpdatePasswordDTO } from './dtos/updatePassword.dto';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUserDTO);
  }

  @Roles(UserUserTypeEnum.Admin)
  @Get()
  async findAllUser(): Promise<ReturnUserDTO[]> {
    return (await this.userService.findAllUser()).map(
      (user) => new ReturnUserDTO(user),
    );
  }

  @Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
  @Get('/loggedIn')
  async findUserLoggedIn(@UserId() userId: number): Promise<ReturnUserDTO> {
    const relations = {
      country: true,
    };

    return new ReturnUserDTO(
      await this.userService.findUserById(userId, relations),
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @Get('/:userId')
  async findUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
    return new ReturnUserDTO(await this.userService.findUserById(userId));
  }

  @Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() UpdatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updateUserPassword(UpdatePasswordDTO, userId);
  }
}
