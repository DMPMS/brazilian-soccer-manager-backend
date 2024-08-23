import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerglobalService } from './managerglobal.service';
import { CreateManagerglobalDTO } from './dtos/createManagerglobal.dto';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateManagerglobalDTO } from './dtos/updateManagerglobal.dto';
import { DeleteResult } from 'typeorm';
import { ReturnManagerglobalDTO } from './dtos/returnManagerglobal.dto';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';

@Controller('managerglobal')
export class ManagerglobalController {
  constructor(private readonly managerglobalService: ManagerglobalService) {}

  @Roles(UserUserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createManagerglobal(
    @Body() createManagerglobalDTO: CreateManagerglobalDTO,
  ): Promise<ManagerglobalEntity> {
    return this.managerglobalService.createManagerglobal(
      createManagerglobalDTO,
    );
  }

  @Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
  @Get()
  async findAllManagerglobal(
    @Query('isWithoutTeamglobal') isWithoutTeamglobal?: boolean,
  ): Promise<ReturnManagerglobalDTO[]> {
    const relations = {
      country: true,
      teamglobal: true,
    };

    return (
      await this.managerglobalService.findAllManagerglobal(
        relations,
        Boolean(isWithoutTeamglobal),
      )
    ).map((managerglobal) => new ReturnManagerglobalDTO(managerglobal));
  }

  @Roles(UserUserTypeEnum.Admin)
  @Get('/:managerglobalId')
  async findManagerglobalById(
    @Param('managerglobalId') managerglobalId,
  ): Promise<ReturnManagerglobalDTO> {
    const relations = {
      country: true,
    };

    return new ReturnManagerglobalDTO(
      await this.managerglobalService.findManagerglobalById(
        managerglobalId,
        relations,
      ),
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:managerglobalId')
  async updateManagerglobal(
    @Body() updateManagerglobalDTO: UpdateManagerglobalDTO,
    @Param('managerglobalId') managerglobalId: number,
  ): Promise<ManagerglobalEntity> {
    return this.managerglobalService.updateManagerglobal(
      updateManagerglobalDTO,
      managerglobalId,
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @Delete('/:managerglobalId')
  async deleteManagerglobal(
    @Param('managerglobalId') managerglobalId: number,
  ): Promise<DeleteResult> {
    return this.managerglobalService.deleteManagerglobal(managerglobalId);
  }
}
