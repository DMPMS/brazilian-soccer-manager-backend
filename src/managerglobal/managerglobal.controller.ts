import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerglobalService } from './managerglobal.service';
import { CreateManagerglobalDto } from './dtos/createManagerglobal.dto';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { ReturnManagerglobalDto } from './dtos/returnManagerglobal.dto';
import { UserType } from 'src/user/enums/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Roles(UserType.Admin)
@Controller('managerglobal')
export class ManagerglobalController {
  constructor(private readonly managerglobalService: ManagerglobalService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createManagerglobal(
    @Body() createManagerglobal: CreateManagerglobalDto,
  ): Promise<ManagerglobalEntity> {
    return this.managerglobalService.createManagerglobal(createManagerglobal);
  }

  @Get()
  async findAllManagerglobal(): Promise<ReturnManagerglobalDto[]> {
    return (await this.managerglobalService.findAllManagerglobal(true)).map(
      (managerglobal) => new ReturnManagerglobalDto(managerglobal),
    );
  }

  @Get('/withoutTeamglobal')
  async findAllManagerglobalWithoutTeamglobal(): Promise<
    ReturnManagerglobalDto[]
  > {
    return (
      await this.managerglobalService.findAllManagerglobalWithoutTeamglobal(
        true,
      )
    ).map((managerglobal) => new ReturnManagerglobalDto(managerglobal));
  }
}
