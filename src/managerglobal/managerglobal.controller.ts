import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerglobalService } from './managerglobal.service';
import { CreateManagerglobalDTO } from './dtos/createManagerglobal.dto';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { ReturnManagerglobalDTO } from './dtos/returnManagerglobal.dto';
import { UserType } from 'src/user/enums/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateManagerglobalDTO } from './dtos/updateManagergloba.dto';

@Roles(UserType.Admin)
@Controller('managerglobal')
export class ManagerglobalController {
  constructor(private readonly managerglobalService: ManagerglobalService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createManagerglobal(
    @Body() createManagerglobal: CreateManagerglobalDTO,
  ): Promise<ManagerglobalEntity> {
    return this.managerglobalService.createManagerglobal(createManagerglobal);
  }

  @Get()
  async findAllManagerglobal(): Promise<ReturnManagerglobalDTO[]> {
    return (await this.managerglobalService.findAllManagerglobal(true)).map(
      (managerglobal) => new ReturnManagerglobalDTO(managerglobal),
    );
  }

  @Get('/withoutTeamglobal')
  async findAllManagerglobalWithoutTeamglobal(): Promise<
    ReturnManagerglobalDTO[]
  > {
    return (
      await this.managerglobalService.findAllManagerglobalWithoutTeamglobal(
        true,
      )
    ).map((managerglobal) => new ReturnManagerglobalDTO(managerglobal));
  }

  @UsePipes(ValidationPipe)
  @Put('/:managerglobalId')
  async updateManagerglobal(
    @Body() updateManagerglobal: UpdateManagerglobalDTO,
    @Param('managerglobalId') managerglobalId: number,
  ): Promise<ManagerglobalEntity> {
    return this.managerglobalService.updateManagerglobal(
      updateManagerglobal,
      managerglobalId,
    );
  }
}
